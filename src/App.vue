<template>
  <div id="app">
    <LoginMenu />
    <router-link to="/"><img alt="Vue logo" src="./assets/logo.png"></router-link>
    <router-view/>
  </div>
</template>

<script>
import LoginMenu from './components/LoginMenu.vue'

export default {
  components: { LoginMenu },
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
