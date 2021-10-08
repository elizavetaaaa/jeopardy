import Vue from 'vue'
import Vuex from 'vuex'
//import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        name: '',
        score: 0,
        numberOfQ : 0,
        correctAns:0,
        wrongAns: 0,
        categories: [],
        tableLoad: false,
        currentEvent: event,
        timerCount: 8,
        isSuccess: false
    },
    mutations: {
        updateCategories(state, category) {
            state.categories.push(category);

        },
        setName(state, name) {
            state.name = name;
        },
        setScore(state, score) {
            state.score = score
        },
        setNumberOfQ(state, numberOfQ) {
            state.numberOfQ = numberOfQ
        },

        setCorrectAns(state, correctAns) {
            state.correctAns = correctAns
        },
        setWrongAns(state, wrongAns) {
            state.wrongAns = wrongAns
        },
        setCurrentEvent(state, currentEvent){
            state.currentEvent = currentEvent;
        },
        setTimerCount(state, timerCount){
            state.timerCount = timerCount;
        },

        setSuccess(state, isSuccess){
            state.isSuccess = isSuccess;
        },

    },
    actions: {

        fetchCategories({commit}) {
            let idxs = [13, 20, 50, 100, 2 ];
            idxs.map((el) => {
                console.log(el)
                fetch(`https://jservice.io/api/category?id=${el}`)
                    .then((res) => {
                        //  console.log(res);
                        return res.json()
                    })
                    .then((category) => {
                        commit('updateCategories', category);
                        //console.log(category)
                    })
                //console.log(this.state.categories);
                this.state.tableLoad = true;

            })

        }
    },

    getters: {
        getCategories(state) {
            return state.categories
        },
        getName(state) {
            return state.name;
        },

        getScore(state) {
            return state.score
        },
        getNumberOfQ (state){
            return state.numberOfQ
        },

        getCorrectAns (state){
            return state.correctAns
        },
        getWrongAns (state){
            return state.wrongAns
        },
        getCurrentEvent(state){
            return state.currentEvent
        },
        getTimerCount(state){
            return state.timerCount
        },
        getSuccess(state){
            return state.isSuccess
        },
    },


});

export default store;