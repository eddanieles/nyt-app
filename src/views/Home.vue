<template>
  <div>
    <input type="text" v-on:change="handleSubmit">
    <ul>
        <li v-for="article in articles" :key="article.id">
            {{article}}
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
        handleSubmit(event) {
            let searchText = event.target.value;
            getArticles(searchText).then(value => {
                this.articles = value.data.response.docs;
            });
        }
    }

}
</script>

<style>

</style>