<template>
<div class="Main">
      <Header/>

      <router-view></router-view>
<!--      <ul v-for="item in allPosts" :key="item.key">-->
<!--        <li>{{item.title}}</li>-->
<!--      </ul>-->

</div>
</template>

<script>


import Header from "./Header";
import {mapGetters} from "vuex";
export default {
  name: "Main",
  components: {Header},
  data(){
    return{
    }
  },
  computed: mapGetters(["getName"]),
  methods:{

  }
}
</script>

<style scoped lang="scss">
.Main{
  padding: 0;
  display: flex;
  flex-direction: column;
  //justify-content: center;

}

</style>