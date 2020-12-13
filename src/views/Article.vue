<template>
  <div>
    <Article />
    <save-favorites/>
  </div>
</template>

<script>
import Article from '../components/Article'
import SaveFavorites from '../components/SaveFavorites'

export default {
    components: {
        Article,
        SaveFavorites
    }
}
</script>

<style>

</style>