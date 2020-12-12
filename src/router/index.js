import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Params from '../views/Params'
import Article from '../views/Article'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home
    },
    {
        path: '/params',
        component: Params
    },
    {
        path: '/article/:id',
        component: Article
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router