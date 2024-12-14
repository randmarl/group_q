<template>
    <div class="login-page">
      
      <div class="login-container">
        <h2 class="welcome-message">Create Your Account</h2>
        <form @submit.prevent="validateSignupForm">
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
          <p id="validation-message" class="error-message">{{ validationMessage }}</p>
          <button class="signup-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
</template> 

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      validationMessage: "",
    };
  },
  methods: {
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
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.signup-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.signup-btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
}
</style>