<template>
  <div>
    <input placeholder="find articles..." type="text" v-on:change="handleSubmit">
    <ul>
        <li v-for="article in articles" :key="article.id">
            <router-link :to="`/article/${encodeURIComponent(article.uri)}`">
                <p class="title">{{article.title ? article.title : article.headline.main}}</p>
                <p class="authors">{{typeof article.byline === "string" ? article.byline : article.byline.person.map(author => {
                        return `${author.firstname} ${author.lastname}`
                    })
                    }}
                </p>
                <p>{{article.abstract}}</p>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>
import { getArticles, getHomePage } from '../services/ApiService'

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
                console.log(value);
                this.articles = value.data.response.docs;
            });
        }
    },
    created() {
        getHomePage().then(value => {
            console.log(value);
            this.articles = value.data.results;
        });
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
</style>