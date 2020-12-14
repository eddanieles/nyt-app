<template>
  <div>
    <input placeholder="find articles..." type="text" v-on:change="handleSubmit">
    <div>

    </div>
    <div v-if="!showNoArticlesFound">
        <ul>
            <li v-for="article in articles" :key="article.id">
                <router-link :to="`/article/${encodeURIComponent(article.uri)}`">
                    <article-display v-bind:articleObj="article"/>
                </router-link>
            </li>
        </ul>
    </div>
    <div v-else-if="showNoArticlesFound">
        <p id="articlesNotFound">Sorry, no articles were found for "{{searchText}}".</p>
        <p>Please search again.</p>
    </div>
  </div>
</template>

<script>
import ArticleDisplay from '../components/ArticleDisplay.vue';
import { getArticles, getHomePage } from '../services/ApiService'

export default {
  components: { ArticleDisplay },
    name: 'Home',
    data() {
        return {
            articles: [],
            showNoArticlesFound: false,
            searchText: ""
        }
    },
    methods: {
        handleSubmit(event) {
            this.searchText = event.target.value;
            getArticles(this.searchText).then(value => {
                console.log(value);
                this.articles = value.data.response.docs;
                this.articles.length > 0 ? this.showNoArticlesFound = false : this.showNoArticlesFound = true;
            });
        }
    },
    created() {
        getHomePage().then(value => {
            this.articles = value.data.results;
        })
    }
}
</script>

<style>
    ul {
        list-style-type: none;
    }
    li {
        border: 1px solid black;
        margin: 10px;
    }
    #articlesNotFound {
        font-size: xx-large;
        font-style: italic;
    }
</style>