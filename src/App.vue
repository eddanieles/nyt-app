<template>
  <div id="app">
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
      <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <router-link to="/"><img alt="Vue logo" src="./assets/logo.png"></router-link>
          <button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
            <span class="block relative w-6 h-px rounded-sm bg-white"></span>
            <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
          <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item">
                <input class="rounded" type="text" placeholder="find articles...">
              </li>
              <li v-if="currentUser" class="nav-item">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  {{currentUser.email}}
                </a>
              </li>
              <li v-else class="nav-item">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  <router-link to="/login">Login</router-link>
                </a>
              </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { auth } from './firebase'

export default {
  name: 'App',
  data() {
    return {
      currentUser: {}
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  mounted() {
    this.currentUser = auth.currentUser;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#logout {
  font-size: x-small;
}
</style>
