<template>
  <div id="app">
    <p v-if="currentUser">{{currentUser.email}} <a id="logout" @click="logout()">(logout)</a></p>
    <img alt="Vue logo" src="./assets/logo.png">
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logout {
  font-size: x-small;
}
</style>
