<template>
  <div>
    <Article />
    <router-link :to="`/profile/favorites`">
        <button v-on:click="saveToFavorites()">Save To Favorites</button>
    </router-link>
  </div>
</template>

<script>
import Article from '../components/Article'

export default {
    components: {
        Article
    },
    methods: {
        saveToFavorites() {
            this.$store.dispatch('createFavorite', {
                article: this.article
            })
        }
    }
}
</script>

<style>

</style>