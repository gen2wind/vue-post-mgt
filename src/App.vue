<template>
  <div>
    <NavBar />
    <div class="container main-app">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import  '../node_modules/materialize-css/dist/css/materialize.min.css';
import  '../node_modules/materialize-css/dist/js/materialize.min.js';
export default {
  name: 'App',
  components:{
    NavBar,
    Footer
  }
}
</script>

<style>
    .container.main-app{
      min-height: 82.1vh!important;
      margin-bottom: 5%!important;
    }
</style>
