<template>
  <header>
    <nav>
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/contact" class="nav-button">Contact</router-link>
      <template v-if="isAuthenticated">
        <button @click="logout" class="nav-button">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-button">Login</router-link>
      </template></nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
header {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 60px;
}

nav {
  background-color: #333;
	flex-direction: row;
	justify-content: space-evenly;
	display: flex;
	align-items: center;
  color: white;
  padding: 10px 0;
  gap: 10px;
}

.nav-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  border: 1px solid #007bff;
  transition: 0.3s;
}

.nav-button:hover {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
}
</style>