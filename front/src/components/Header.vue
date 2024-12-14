<template>
    <nav>
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/login" class="nav-button">Login</router-link>
    </nav>
</template>

<style>
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