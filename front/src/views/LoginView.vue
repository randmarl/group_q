<template>
    <div class="login-page">
      <AppHeader />
      <div class="login-container">
        <h2 class="welcome-message">Login to Your Account</h2>
        <form @submit.prevent="handleLogin">
          <input
            id="email"
            v-model="email"
            placeholder="Email"
            required
            type="email"
          />
          <input
            id="password"
            v-model="password"
            placeholder="Password"
            required
            type="password"
          />
          <p class="error-message" v-if="validationMessage">{{ validationMessage }}</p>
          <button class="action-btn" type="submit">Log In</button>
        </form>
        <p class="toggle-message">
          Don't have an account?
        <button @click="navigateToSignup" class="signup-link">Sign Up</button>
      </p>
      </div>
      <AppFooter />
    </div>
</template> 

<script>
import axios from 'axios';
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      email: "",
      password: "",
      validationMessage: "",
    };
  },
  methods: {
      async handleLogin() {
      this.validationMessage = "";
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
        alert('Login successful!');
        this.$router.push("/");
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          this.validationMessage = "Incorrect email or password.";
        } else if (error.response?.status === 404) {
          this.validationMessage = "User does not exist.";
        } else {
          this.validationMessage = error.response?.data || "An error occurred.";
        }
      }
    },
    navigateToSignup() {
      this.$router.push("/signup");
    },
      validateSignupForm() {
        this.validationMessage = "";
        const errors = [];
        if (this.password.length < 8 || this.password.length >= 15) {
          errors.push("Password must be at least 8 characters and less than 15 characters long.");
        }
        if (!/^[A-Z]/.test(this.password)) {
          errors.push("Password must start with an uppercase alphabet character.");
        }
        if (!/[A-Z]/.test(this.password)) {
          errors.push("Password must include at least one uppercase alphabet character.");
        }
        if ((this.password.match(/[a-z]/g) || []).length < 2) {
          errors.push("Password must include at least two lowercase alphabet characters.");
        }
        if (!/\d/.test(this.password)) {
          errors.push("Password must include at least one numeric value.");
        }
        if (!/_/.test(this.password)) {
          errors.push("Password must include the character '_'.");
        }

        if (errors.length > 0) {
          this.validationMessage = "The password is not valid - " + errors.join(" ");
        } else {
          alert("Account successfully created!");

          this.email = "";
          this.password = "";
      }
    },
  },
};
</script>

<style scoped>

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f9f9f9;
}

.login-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

.welcome-message {
  margin-bottom: 20px;
}

input {
  display: block;
  width: calc(100% - 40px);
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.action-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  text-align: center;
}

.signup-link {
  background: none;
  color: #007bff;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.toggle-message {
  margin-top: 10px;
  font-size: 0.9rem;
}

.toggle-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}
</style>