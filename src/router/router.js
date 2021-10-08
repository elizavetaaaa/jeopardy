import Vue from "vue";
import Router from "vue-router";
import Greeting from "../components/Greeting";
import Main from "../components/Main";
import Game from "../components/Game";
import Statistics from "../components/Statistics";
import GameTable from "../components/GameTable";

Vue.use(Router);

let router = new Router({
    routes:[
        {
            path: '/',
            name: 'Greeting',
            component: Greeting

        },
        {
            path: '/main',
            name: 'Main',
            component: Main,
            children:[
                {
                    path: 'game',
                    name: 'Game',
                    component: Game
                },
                {
                    path: 'statistics',
                    name: 'Statistics',
                    component: Statistics
                },
                {
                    path: 'gametable',
                    name: 'GameTable',
                    component: GameTable
                }

            ]
        }

    ]
});

export default router;