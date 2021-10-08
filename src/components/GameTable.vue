<template>
  <div class="gametable">

    <div class="gametable__top-section">
      <div>
      <p class="gametable__user-name" v-if="this.$store.state.name===''"> <span>User:</span> {{ getName='Mister Unknown' }}</p>
      <p class="gametable__user-name" v-else> <span>User:</span> {{ getName }}</p>
      <p class="gametable__user-score"> <span>Score:</span> {{ this.$store.state.score }}</p>
      </div>
      <button class="gametable__finish_game" @click="finishGame">Finish Game</button>
    </div>

    <table class="gametable__table">

      <tr class="gametable__tr" v-for="category in getCategories" :key="category.id">
        <td class="gametable__td_main">{{ category.title }}</td>

        <td class="gametable__td"
            @click="openQuestion"
            :id="category.clues[0].id"
        >
          {{ category.clues[0].value }}
        </td>

        <td class="gametable__td"
            @click="openQuestion"
            :id="category.clues[1].id"
        >
          {{ category.clues[1].value }}
        </td>


        <td class="gametable__td"
            @click="openQuestion"
            :id="category.clues[2].id"
        >
          {{ category.clues[2].value }}
        </td>

        <td class="gametable__td"
            @click="openQuestion"
            :id="category.clues[3].id"
        >
          {{ category.clues[3].value }}
        </td>

        <td class="gametable__td"
            @click="openQuestion"
            :id="category.clues[4].id"
        >
          {{ category.clues[4].value }}
        </td>
      </tr>
    </table>
    <div class="gametable__statistics">
      <ul class="gametable__ul">

        <li><span>Number of questions: </span>{{ getNumberOfQ }}</li>
        <li><span>Correct answers :</span> {{ getCorrectAns }}</li>
        <li><span>Wrong answers: </span>{{ getWrongAns }} </li>
        <li></li>
      </ul>
    </div>






    <div class="gametable__overlay-bg" v-if="showModal">

      <div class="gametable__question_modal" v-if="isQuestionOpen">
        <button class="gametable__close-btn" @click="closeModal">Х</button>
        <p class="gametable__timer"> Time limit : {{ timerCount }} seconds </p>
        <h4 class="gametable__question">{{ question }}</h4>
        <form action="" class="gametable__submit_form">
          <input class="gametable__input" type="text" placeholder="enter your answer" v-model="userAnswer">
          <button class="gametable__btn" @click="checkResult">Send</button>
        </form>
        <div class="gametable__question-extra-data">
          <p ><span>Question cost </span>: {{value}} $  </p>
          <p> <span>Right answer:</span> {{ answer }}</p>
        </div>

      </div>

      <div class="gametable__success_window" v-if="isCorrect">
        <h3>Yahoo!</h3>
        <h4>Your answer is correct!</h4>
        <p>+ {{ this.value }} points :D</p>
        <button class="gametable__success_window_btn" @click="closeSuccessWindow">OK</button>
      </div>
    </div>


    <div class="gametable__fail_window" v-if="isWrong">
      <h3>Ups..</h3>
      <h4>Your answer is wrong!</h4>
      <p>- {{ this.value }} points :(</p>
      <button class="gametable__fail_window_btn" @click="closeFailWindow">OK</button>
    </div>

    <div class="gametable__finish_game_window" v-if="isFinish">
      <h3>Are you sure?</h3>
      <p>All data will be deleted</p>
      <div class="gametable__finish_btns"></div>
      <button class="gametable__finish_btn" @click="finishConfirm">YES</button>
      <button class="gametable__finish_btn" @click="finishCancel">NO</button>
    </div>

    <div class="gametable__total_finish" v-if="isTotalFinish">
      <h4 class="gametable__question">Game over!</h4>
      <div class="gametable__question-extra-data">
        <div v-if="this.$store.state.score >4000">
          <p ><span>Your score is</span>: {{this.$store.state.score}} $ <span>That's excellent!</span> </p>
          <img src="https://c.tenor.com/ulNayFKcqgUAAAAC/stickman-emoji.gif" width="100px" height="100px"/>
        </div>
        <div v-else-if="this.$store.state.score  > 500">
          <p ><span>Your score is</span>: {{this.$store.state.score}} $ <span>That's not so good!</span> </p>
          <img src="https://c.tenor.com/Dpzn4tUI-X4AAAAM/bored-smiley.gif" width="100px" height="100px"/>
        </div>
        <div v-else>
          <p ><span>Your score is</span>: {{this.$store.state.score}} $ <span>It is so sad...</span> </p>
          <img src="https://i.pinimg.com/originals/11/3f/60/113f60be580a09ef0027073423d98f0f.gif" width="100px" height="100px"/>
        </div>

        <p> <span>Do you want to play again?</span></p>
        <div class="gametable__yesno-btns">
          <button class="gametable__yesno_btn" @click="continueConfirm">YES</button>
          <button class="gametable__yesno_btn" @click="continueCancel">NO</button>
        </div>

      </div>

    </div>

  </div>


</template>

<script>
import {mapGetters} from "vuex";
import Vue from 'vue'
import vWow from 'v-wow'
Vue.use(vWow);


export default {
  name: "GameTable",


  data() {
    return {
      showModal: false,
      isQuestionOpen: false,
      id: null,
      question: '',
      answer: '',
      value: 0,
      userAnswer: null,
      isCorrect: false,
      isWrong: false,
      isTimeLimit: false,
      timerCount: 0,
      localEvent: event,
      intervalId: null,
      isFinish: false,
      isTotalFinish: false

    }
  },
  watch: {
    timerCount: {

      immediate: true // This ensures the watcher is triggered upon creation
    }

  },
  methods: {
    handler(time) {
      this.$store.commit('setCurrentEvent', this.localEvent);
      this.timerCount = time;
      if (this.timerCount > 0) {
        this.intervalId = setInterval(() => {
          this.timerCount--;
          if (this.timerCount === 0 && this.userAnswer === '') {
            this.$store.state.numberOfQ += 1;
            this.$store.state.wrongAns += 1;
            clearInterval(this.intervalId);
            console.log("interval is clean");
            this.showModal = false;
            this.isQuestionOpen = false;
            console.log(this.showModal)
            console.log(this.isQuestionOpen)
            this.$store.commit('setScore', this.$store.state.score - this.value);
            this.$store.state.currentEvent.target.style.background = 'red';



          }
        }, 1000);

      }
    },

    openQuestion(e) {
      //console.log("I am target" + e.target.value);
      this.userAnswer = '';
      this.localEvent = e;
      this.handler(10);
      this.showModal = true;
      this.isQuestionOpen = true;
      let quesId = e.target.id
      this.id = quesId;
      this.$store.state.categories.map((el) => {
        el.clues.forEach((item) => {
          if (item.id === +quesId) {
            this.answer = item.answer;
            this.question = item.question;
            this.value = item.value
          }
        })
      })
    },

    checkResult(e) {
      e.preventDefault();
      this.$store.commit('setNumberOfQ', this.$store.state.numberOfQ + 1);
      this.$store.commit('setCurrentEvent', this.localEvent);

      if (this.answer === this.userAnswer) {
        this.$store.state.isSuccess = true;
       // this.$store.state.currentEvent.target.style.cursor = 'not-allowed';
        this.$store.state.currentEvent.target.style.background = 'green';
        this.$store.commit('setCorrectAns', this.$store.state.correctAns + 1);
        this.$store.commit('setScore', this.$store.state.score += this.value);
        this.isQuestionOpen = false;
        this.isCorrect = true;

      } else {
        console.log("not correct")
        this.$store.commit('setWrongAns', this.$store.state.wrongAns + 1)
        this.isQuestionOpen = false;
        this.isWrong = true;
        this.$store.commit('setScore', this.$store.state.score - this.value);
        this.$store.state.currentEvent.target.style.background = 'red';
      }


    },

    finishGame() {
      this.showModal = true;
      this.isFinish = true;
    },


    closeModal() {
      this.showModal = false;
      clearInterval(this.intervalId);
    },

    closeSuccessWindow() {
      this.showModal = false;
      this.isCorrect = false;
      clearInterval(this.intervalId);
      if(this.$store.state.numberOfQ === 5){
        this.showModal = true ;
        this.isTotalFinish = true;
      }
    },

    closeFailWindow() {
      this.showModal = false;
      this.isWrong = false;
      clearInterval(this.intervalId);
      if(this.$store.state.numberOfQ === 5){
        this.showModal = true ;
        this.isTotalFinish = true;
      }
    },

    closeTimeWindow() {
      this.showModal = false;
      this.isTimeLimit = false;
    },

    finishConfirm() {
      this.$store.state.name = '';
      this.$store.state.numberOfQ = 0;
      this.$store.state.correctAns = 0;
      this.$store.state.wrongAns = 0;
      this.$store.state.score = 0;
      this.$router.push({name: "Greeting"});
    },

    finishCancel(){
      this.showModal = false;
      this.isFinish = false;

    },

    continueConfirm(){
      //this.$store.state.name = '';
      this.$store.state.numberOfQ = 0;
      this.$store.state.correctAns = 0;
      this.$store.state.wrongAns = 0;
      this.$store.state.score = 0;
      this.showModal = false;
      this.isTotalFinish = false;
      this.$router.push({name: "GameTable"});
      this.$store.state.currentEvent = null;

    },
    continueCancel(){
      this.$store.state.name = '';
      this.$store.state.numberOfQ = 0;
      this.$store.state.correctAns = 0;
      this.$store.state.wrongAns = 0;
      this.$store.state.score = 0;
      this.$router.push({name: "Greeting"});
    }
  },

  computed: mapGetters(['getName', 'getNumberOfQ', 'getCorrectAns', 'getWrongAns', 'getCategories', 'getSuccess']),
  mounted() {
    !this.$store.state.tableLoad ? this.$store.dispatch('fetchCategories') : '';
  }
}
</script>

<style scoped lang="scss">
.gametable {
  padding: 0 100px ;

  &__top-section{
    margin-top: 30px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    //background-color: lightsalmon;
  }
  &__st-title{
    margin-bottom: 20px;
  }
  &__user-name{
    float: left;
    font-size: 24px;
  }

  &__user-score{
    float: left;
    font-size: 24px;
    margin-left: 30px;
  }
  &__ul{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    //background-color: lightpink;
    padding: 0;
   // margin-top: 20px;
  }
  &__td_main {
    font-size: 20px;
    text-transform: capitalize;
    padding-left: 20px;
    background-color: cornflowerblue;
    transition: 0.9s;
  }

  &__td {
    &:hover {
      background-color: #4cba76;
      cursor: pointer;
      font-size: 28px;
    }

  }

  &__overlay-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;


  }

  &__question_modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 1000px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    padding: 20px 0;
    flex-direction: column;

  }

  &__total_finish{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 500px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    padding: 20px 0;
    flex-direction: column;
    z-index: 999;
  }

  &__timer {
    color: #e86258;
    font-size: 20px;
    font-weight: 2000;
  }

  &__success_window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 280px;
    background-color: #fff;
    z-index: 998;
    border-radius: 8px;
    //display: flex;
    //align-items: center;
    flex-direction: column;
  }

  &__success_window_btn {
    width: 200px;
    height: 40px;
    background-color: cornflowerblue;
    color: white;
    border: none;
    outline: none;
    border-radius: 8px;
    transition: 0.5s;

    &:hover {
      background-color: darkslateblue;
      font-size: 18px;
      cursor: pointer;

    }
  }

  &__time_window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background-color: #f7c372;
    z-index: 998;
    border-radius: 8px;
    //display: flex;
    //align-items: center;
    flex-direction: column;
  }

  &__time_window_btn {
    width: 200px;
    height: 40px;
    background-color: #fff;
    color: lightcoral;
    border: none;
    outline: none;
    border-radius: 8px;
    transition: 0.5s;

    &:hover {
      background-color: lightcoral;
      color: white;
      font-size: 18px;
      cursor: pointer;


    }


  }


  &__fail_window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 280px;
    // background-color: #fff;
    z-index: 998;
    background-color: #e86258;
    color: #fff;
    border-radius: 8px;
    flex-direction: column;
  }

  &__fail_window_btn {
    width: 200px;
    height: 40px;
    background-color: #fff;
    color: lightcoral;
    border: none;
    outline: none;
    border-radius: 8px;
    transition: 0.5s;

    &:hover {
      background-color: lightcoral;
      color: white;
      font-size: 18px;
      cursor: pointer;

    }

  }

  &__finish_game_window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    // background-color: #fff;
    z-index: 998;
    background-color: #e86258;
    color: #fff;
    border-radius: 8px;
    //display: flex;
    // align-items: center;
    flex-direction: column;
    // padding: 60px 0;

  }

  &__finish_btns {
    display: flex;
  }


  &__close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    color: rebeccapurple;
    font-size: 30px;
  }

  &__submit_form {
    display: flex;
    //flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
  }

  &__input {
    width: 550px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 10px;
    margin-right: 10px;
  }

  &__btn {
    height: 42px;
    width: 200px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #4cba76;
    color: #fff;
    transition: 0.5s;

    &:hover {
      background-color: #266DB6;
    }
  }

  &__question-extra-data{
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  &__finish_game {
    width: 200px;
    height: 60px;
    background-color: #5460ff;
    color: white;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    transition: 0.5s;

    &:hover {
      background-color: red;
      cursor: pointer;

    }
  }

  &__finish_btn {
    width: 100px;
    height: 30px;
    border-radius: 8px;
    margin-right: 10px;
    border: none;
    outline: none;

    &:nth-child(2) {
      margin-right: 0;
    }

    &:hover {
      cursor: pointer;
      background-color: lightpink;
      color: #fff;
      font-weight: bold;

    }

  }

  &__yesno-btns{

    margin-top: 20px;
  }

  &__yesno_btn{
    background-color: lightpink;
    width: 100px;
    height: 30px;
    border-radius: 8px;
    margin-right: 10px;
    border: none;
    outline: none;
    color: #fff;
    transition: 0.3s;

    &:hover{
      background-color: coral;
      font-size: 16px;

    }
  }




}

.active {
  background-color: indianred;
}

table {
  margin: 20px auto 40px;

}

tr {
  height: 80px;
  background-color: #51b68e;

}

td {
  width: 200px;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
}

td:first-child {
  font-weight: bold;
  width: 200px;
  text-align: left;
  padding-left: 10px;
}

table, th, td {
  border: 1px solid black;
}

span {
  font-weight: bold;
  margin: 0 15px;

}
</style>

