import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/')
    } else {
        next()
    }
})

let app
auth.onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            render: h => h(App),
        }).$mount('#app')
    }
})