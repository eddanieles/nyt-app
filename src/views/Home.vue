<template>
  <div>
    <input type="text" v-on:change="handleSubmit">
    <ul>
        <li v-for="article in articles" :key="article.id">

        </li>
    </ul>
  </div>
</template>

<script>
import { getArticles } from '../services/ApiService'

export default {
    name: 'Home',
    data() {
        return {
            articles: []
        }
    },
    methods: {
        async handleSubmit(e) {
           this.articles = getArticles(e.target.value);
        }
    }

}
</script>

<style>

</style>