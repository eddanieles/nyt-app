<template>
  <div>
    <input type="text" v-on:change="handleSubmit">
    <ul>
        <li v-for="article in articles" :key="article.id">
            <router-link :to="`/article/${encodeURIComponent(article._id)}`">
                <p>{{article.headline.main === "No Headline" ? null : article.headline.main}}</p>
                <p>{{article.byline.person.length >= 1 ? article.byline.person.map(person => {
                            return `${person.firstname} ${person.lastname}`
                        }) : null
                    }}
                </p>
                <p>{{article.abstract ? article.abstract : "sorry, empty article"}}</p>
            </router-link>
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
    },
    created() {
        getArticles("headlines").then(value => {
                this.articles = value.data.response.docs;
                console.log(this.articles);
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