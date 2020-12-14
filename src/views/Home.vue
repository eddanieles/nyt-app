<template>
  <div>
    <input placeholder="find articles..." type="text" v-on:change="handleSubmit">
    <div>

    </div>
    <div v-if="!showNoArticlesFound">
        <ul>
            <li v-for="article in articles" :key="article.id">
                <router-link :to="`/article/${encodeURIComponent(article.uri)}`">
                    <p class="title">{{article.title ? article.title : article.headline.main ? article.headline.main : null}}</p>
                    <p class="authors">
                        {{typeof article.byline === "string" ? article.byline : article.byline.person.map(author => {
                                return `${author.firstname} ${author.lastname}`
                            })
                        }}
                    </p>
                    <div v-if="article.multimedia[0].url">
                        <img v-if="/^http/.test(article.multimedia[0].url)" class="article-image" v-bind:src="`${article.multimedia[0].url}`" alt="">
                        <img v-else class="article-image" v-bind:src="`https://www.nytimes.com/${article.multimedia[0].url}`" alt="">
                    </div>
                    <div v-else>
                    </div>
                    <p>{{article.snippet || article.lead_paragraph || article.abstract}} 
                        <a target="_blank" v-bind:href="`${article.web_url}`">...read full article</a>
                    </p>
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
import { getArticles, getHomePage } from '../services/ApiService'

export default {
    name: 'Home',
    data() {
        return {
            articles: [],
            showNoArticlesFound: false,
            searchText: "",
            changeEmmit: false
        }
    },
    methods: {
        handleSubmit(event) {
            this.searchText = event.target.value;
            getArticles(this.searchText).then(value => {
                this.articles = value.data.response.docs;
                this.articles.length > 0 ? this.showNoArticlesFound = false : this.showNoArticlesFound = true;
            }).then(() => {
                console.log(this.articles)
            })
            
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