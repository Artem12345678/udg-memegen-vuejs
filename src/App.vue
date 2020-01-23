<template>
  <div id="app">
    <Header/>

    <main class="container">
      <router-view/>
    </main>

    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex-grow: 1;
  }
</style>
