<template>
  <div>
    <article-display />
    <save-favorites />
  </div>
</template>

<script>
import ArticleDisplay from '../components/ArticleDisplay.vue'
import SaveFavorites from '../components/SaveFavorites'

export default {
    components: {
        SaveFavorites,
        ArticleDisplay,
    }
}
</script>

<style>

</style>