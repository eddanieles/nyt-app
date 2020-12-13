<template>
  <div id="app">
    <p>Logged in as: {{currentUser.email}}</p>
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
</style>
