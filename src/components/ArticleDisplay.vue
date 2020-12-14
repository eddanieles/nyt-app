<template>
    <div>
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
    </div>
</template>

<script>
import { getArticle } from '../services/ApiService'

export default {
    name: 'ArticleDisplay',
    data() {
        return {
            article: { 
                byline : {
                    person : []
                }, 
                headline : {
                    main : ""
                },
                multimedia : [
                    { url: "https://mwcm.nyt.com/.resources/mkt-wcm/dist/libs/assets/img/logo-nyt-header.svg" }
                ]
            }
        }
    },
    methods: {
        initializeArticle() {
            let url = this.$route.params.id || this.$props.id;
            getArticle(url).then(value => {
                this.article = value.data.response.docs[0];
                this.article.multimedia.length > 0 ? this.article.multimedia : this.article.multimedia = [{ url: "" }];
                console.log(this.article);
            })
        }
    },
    beforeMount() {
        this.$route.path === "/" ? console.log(this.$route.path === "/") : console.log(this.$route.path);
        this.initializeArticle();
    },
    props: [
        "id"
    ]
}
</script>

<style>
.title {
    font-size: large;
}
.authors {
    font-size: small;
}
.article-image {
    height: 200px;
    width: 200px;
}
</style>