<template>
  <div>
    <!-- <input type="text" v-on:change="handleSubmit"> -->
    <ul>
        <li v-for="article in articles" :key="article.id">

        </li>
    </ul>
  </div>
</template>

<script>
// import { getArticles } from '../services/ApiService'

export default {
    name: 'Home',
    data() {
        return {
            articles: []
        }
    },
    methods: {
        // handleSubmit(event) {
        //     let query = event.target.value;
        //     this.articles = getArticles(query);
        //     console.log(this.articles)
        // }
    }

}
</script>

<style>

</style>