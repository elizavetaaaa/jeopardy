<template>
<div class="game">
  <h4 class="game__title">Hello, {{getName}} !</h4>
  <p class="game__subtitle">In this game you are given categories with questions of a certain value. The higher the price of the issue, the more difficult it is. If you answer the question correctly, you get points equal to the cost of the question. If you answer incorrectly, then the points are deducted from your balance. </p>
  <p class="game__subtitle">Please note, the time for answering each question is limited, so hurry up to answer, otherwise you will lose points. The game ends when all questions have been reviewed.</p>
  <p class="game__subtitle">Good luck!</p>
  <button class="game__btn" @click="startGame"> start</button>
</div>
</template>

<script>
//import {mapGetters} from 'vuex';
import {mapGetters} from "vuex";

export default {
  name: "Game",
  computed: mapGetters(['getName']),
  methods:{
    //computed: mapGetters(['getCategories']),
    startGame(){
      this.$router.push({name: "GameTable"});
      console.log("hello from method!" + JSON.stringify(this.$store.state.categories));
    }
  }
}
</script>

<style scoped lang="scss">
.game{
  padding: 50px 200px;
  display: flex;
  //background-color: lightsalmon;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  align-content: center;

  &__title{
    font-size: 30px;
  }
  &__btn{
    width: 300px;
    height: 50px;
    background-color: cornflowerblue;
    color: white;
    border: none;
    outline: none;
    border-radius: 8px;
    font-size: 24px;
    transition: 0.5s;
    margin-top: 20px;
    &:hover{
      background-color: darkslateblue;
      cursor: pointer;
    }
  }

  &__subtitle{
    text-align: left;
  }
}


</style>

<!-- HTML !-->


/* CSS */

