<template>
  <div>
    <input placeholder="find articles..." type="text" v-on:change="handleSubmit">
    <div>

    </div>
    <div v-if="!showNoArticlesFound">
        <div v-for="article in articles" :key="article.id" class="border border-black rounded m-8">
            <router-link :to="`/article/${encodeURIComponent(article.uri)}`">
                <div class="flex flex-row">
                    <div v-if="article.multimedia.length > 0 && article.multimedia[0].url">
                        <img v-if="/^http/.test(article.multimedia[0].url)" class="article-image" v-bind:src="`${article.multimedia[0].url}`" alt="">
                        <img v-else class="article-image" v-bind:src="`https://www.nytimes.com/${article.multimedia[0].url}`" alt="">
                    </div>
                    <div class="text-center relative">
                        <div class="text-3xl mb-3 font-bold">{{article.title ? article.title : article.headline.main ? article.headline.main : null}}</div>
                        <div class="text-xs mb-3">
                            {{typeof article.byline === "string" ? article.byline : article.byline.person.map(author => {
                                    return `${author.firstname} ${author.lastname}`
                                })
                            }}
                        </div>
                        <div>
                            {{article.snippet || article.lead_paragraph || article.abstract}} 
                        </div>
                        <div class="absolute bottom-0 right-0">
                            <a class="text-xs" target="_blank" v-bind:href="`${article.web_url}`">...read full article</a>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
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
    #articlesNotFound {
        font-size: xx-large;
        font-style: italic;
    }
</style>