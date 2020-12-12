<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Vuegram</h1>
        <p>Welcome to the <a href="https://savvyapps.com/" target="_blank">Savvy Apps</a> sample social media web app powered by Vue.js and Firebase.
          Build this project by checking out The Definitive Guide to Getting Started with Vue.js</p>
      </div>
      <div  :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
            <button class="button">Log In</button>
            <div class="extras">
                <a>Forgot Password</a>
                <a @click="toggleForm()">Create an Account</a>
            </div>
        </form>
        <form v-else @submit.prevent>
            // signup form content
            // .extras div
            <h1>Get Started</h1>
            <div>
                <label for="name">Name</label>
                <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
            </div>
            <div>
                <label for="title">Title</label>
                <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
            </div>
            <div>
                <label for="email2">Email</label>
                <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
            </div>
            <div>
                <label for="password2">Password</label>
                <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
            </div>
            <button @click="signup()" class="button">Sign Up</button>
            <div class="extras">
                <a @click="toggleForm()">Back to Log In</a>
            </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default {
    state: {
        userProfile: {}
    },
    data() {
        return {
            signupForm: {
                name: '',
                title: '',
                email: '',
                password: '',
                showLoginForm: true
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.loginForm.email,
                password: this.loginForm.password
            })
        },
        signup() {
            this.$store.dispatch('signup', {
                email: this.signupForm.email,
                password: this.signupForm.password,
                name: this.signupForm.name,
                title: this.signupForm.title
            })
        },
        toggleForm() {
            this.showLoginForm = !this.showLoginForm
        }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', userProfile.data())
            
            // change route to dashboard
            router.push('/')
        },
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user profile object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        }
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        }
    }
}

</script>

<style>

</style>