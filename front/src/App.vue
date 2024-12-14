<template>
  <div>
    <AppHeader />
    <router-view/>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: stretch;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
	padding: 0;
}

body, html {
  margin: 0;
  padding: 0;
}
</style>
