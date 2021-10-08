<template>
<div class="header">
  <div class="header__nav">
    <ul class="header__ul">
      <li class="header__li"><router-link  class="header__li-text"  :to="{name: 'GameTable'}">My game</router-link></li>
      <li class="header__li"><router-link class="header__li-text"  :to="{name: 'Statistics'}">Description</router-link></li>
    </ul>

<!--    <router-view></router-view>-->
  </div>
</div>
</template>

<script>



export default {
  name: "Header",

}
</script>

<style scoped lang="scss">
.header{
  padding: 0 !important;
  &__nav{
    width: 100%;

  }
  &__ul{
    width: 100%;
   // background-color: firebrick;
    height: 50px;
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    //justify-content: space-between;background-color: rebeccapurple;background-color: rebeccapurple;background-color: rebeccapurple;
    padding: 0 !important;
  }

  &__li{
    height: 100%;
    //width: 50%;
    font-size: 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    //justify-content: center;
    color: #fff;
    padding-left: 20px;
    transition: 0.5s;
    &:hover{
      font-size: 24px;

    }
    &:first-child{
      background-color: cornflowerblue;
      width: 80%;
      &:hover{
        background-color: darkslateblue;
      }

    }
    &:nth-child(2){
      background-color: gray;
      width: 20%;
      &:hover{
        background-color: darkslateblue;
      }
    }

  }
  &__li-text{
    color: #fff;
    text-decoration: none;
  }

}

</style>