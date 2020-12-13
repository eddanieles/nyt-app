import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import store from './store/index'
import './assets/scss/app.scss'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})

let app
auth.onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')
    }
})