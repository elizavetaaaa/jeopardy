<template>
  <div class="app">
    <router-view></router-view>
<!--    <Main/>-->
  </div>
</template>

<script>
import "./components/Greeting"
// import Greeting from "./components/Greeting";
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';


export default {
  name: 'App',
  components: {
   // Main
     //PostForm,
     // Greeting,

  },
  // computed:{
  //   allPosts(){
  //     return this.$store.getters.allPosts
  //   }
  // }
  //второй вариант :
  methods: mapActions(['fetchCategories']),
  computed: mapGetters(['allCategories']),
  async mounted(){
    // await this.fetchCategories();
  }
}
</script>

<style lang="scss">
.app {
  font-family: 'Montserrat',serif;font-size: 22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 // margin-top: 60px;
  &__link_to_game{
  position: absolute;
    top: 100px;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color:firebrick;
   }
}
</style>
