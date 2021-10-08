<template>
  <div class="greeting">
      <h3 class="greeting__title">Welcome to jeopardy game!</h3>
      <br>
      <form action="">
        <input class="greeting__input" type="text" placeholder="enter your name" v-model="name" title=" latin/cyrillic letters, numbers and underscore only">
        <button class="greeting__btn" type="submit" @click="login"> Start</button>
      </form>

<!--    <img src="src/assets/JEO1.jpeg" alt="logo">-->

  </div>

</template>

<script>

export default {
  name: "Greeting",
  data() {
    return {
      name: null,
    }
  },
  methods: {
    login(e) {
      e.preventDefault();
      let regex3 = /^[a-zA-Z0-9_\u0400-\u04FF]*$/;
      if (regex3.test(this.name) && this.name !== null) {
        this.$store.commit('setName', this.name);
        this.$router.push({name: "Game"})
      }
      else{
        alert("Your name should consist of latin/cyrillic letters, numbers and underscore only! ")
      }
      // return this.name;

    },

  },

  computed: {
    set() {
      this.$store.commit('updateMessage', this.name);
      console.log(this.name);
      this.$store.commit(
          'setName', this.name
      )
      return this.name;
    },

  }


}
</script>

<style scoped lang="scss">
.ball {
  position: absolute;
  border-radius: 100%;
  opacity: 0.7;
}
.greeting {
  margin-top: 15%;
  display: flex;
  //justify-content: center;
  flex-direction: column;
  height: 100vh;

  &__title {
    font-size: 30px;
    color: cornflowerblue;
  }

  &__input {
    width: 270px;
    height: 50px;
    border-radius: 8px;
    border: 0.5px solid grey;
    padding-left: 12px;
    margin-right: 8px;
    outline: none;

  }

  &__btn {
    background-color: cornflowerblue;
    color: white;
    font-weight: bold;
    letter-spacing: 1px;
    width: 100px;
    height: 50px;
    border-radius: 8px;
    border: none;
    transition: 0.5s;

    &:hover {
      cursor: pointer;
      background-color: palevioletred;
      color: aliceblue;
      font-size: 16px;
    }
  }

  &__link_to_card {
    position: absolute;
    top: 50px;
    right: 100px;
    width: 50px;
    height: 40px;
    background-color: #2c3e5020;
    text-align: center;

  }
}



</style>