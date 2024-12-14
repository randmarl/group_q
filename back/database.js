/*
The entire file was copied from Lab 13 backend repository.
Link: https://github.com/M-Gharib/WAD-Lab13-Backend

We made some modifications/additions to get the posts table.
*/

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "secure_app",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432
});

const execute = async(query) => {
    try {
        const client = await pool.connect();
        await client.query(query);
        client.release();
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createUsersTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createPostsTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES users(id),
        body TEXT NOT NULL,
        date_posted TIMESTAMP NOT NULL DEFAULT NOW(),
        date_updated TIMESTAMP
    );`;

const setupDatabase = async () => {
    const usersTableCreated = await execute(createUsersTblQuery);
    if (usersTableCreated) {
        console.log('Table "users" has been created or already exists.');
        const postsTableCreated = await execute(createPostsTblQuery);
        if (postsTableCreated) {
            console.log('Table "posts" has been created or already exists.');
        }
    }
};

setupDatabase();
module.exports = pool;