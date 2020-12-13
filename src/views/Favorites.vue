<template>
  <div>
      <div v-for="favorite in favorites" :key="favorite.id">
          {{favorite}}
      </div>
      <div>Current Favorites</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            favorites: []
        }
    }
}
</script>

<style>

</style>