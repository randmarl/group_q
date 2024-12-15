require('dotenv').config();
const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || "default_secret";
const maxAge = 60 * 60;

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        
}

function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401).send('Unauthorized');

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403).send('Forbidden');
        req.user = user;
        next();
    });
}



app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.get('/auth/authenticate', async(req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.send({ authenticated: false });

    try {
        jwt.verify(token, secret);
        res.send({ authenticated: true });
    } catch (error) {
        res.send({ authenticated: false });
    }
});

app.post('/auth/signup', async(req, res) => {
    const { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await pool.query(
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", 
            [email, hashedPassword]
        );
        const token = generateJWT(newUser.rows[0].id);
        res.status(201).cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true }).json({ user_id: newUser.rows[0].id });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/auth/login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).send("User not found");

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).send("Incorrect password");

        const token = await generateJWT(user.rows[0].id);
        res.status(200).cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true }).json({ user_id: user.rows[0].id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/auth/logout', (req, res) => {
    res.status(202).clearCookie('jwt').json({ message: "Logged out" });
});

app.get('/posts',authenticateToken,  async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts ORDER BY date_posted ASC");
        res.json(allPosts.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/posts', authenticateToken, async (req, res) => {
    const { body } = req.body;
    try {
        const newPost = await pool.query(
            "INSERT INTO posts (user_id, body) VALUES ($1, $2) RETURNING *",
            [req.user.id, body]
        );
        res.status(201).json(newPost.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/posts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rows.length === 0) return res.status(404).send("Post not found");
        res.json(post.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/posts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;
    try {
        await pool.query("UPDATE posts SET body = $1, date_updated = NOW() WHERE id = $2", [body, id]);
        res.send("Post updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/posts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.send("Post deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/posts',authenticateToken,  async (req, res) => {
    try {
        await pool.query("DELETE FROM posts");
        res.send("All posts deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

