<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
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
  padding: 0;
}

main {
  flex: 1;
  padding-top: 60px;
  padding-bottom: 40px;
  overflow-y: hidden;
  justify-content: center;
}

body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
