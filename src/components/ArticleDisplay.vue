<template>
    <div>
        <p class="title">{{article.title ? article.title : article.headline.main ? article.headline.main : null}}</p>
        <p class="authors">written by: {{article.byline.person.length >= 1 ? article.byline.person.map(person => {
                                return `${person.firstname} ${person.lastname}`
                            }) : typeof article.byline === "string" ? article.byline : null
                        
            }}
        </p>
        <p><img class="article-image" v-bind:src="`https://www.nytimes.com/${article.multimedia[0].url}`" alt=""></p>
        <p>{{article.snippet || article.lead_paragraph}} 
            <a v-bind:href="`${article.web_url}`">...read full article</a>
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
                    { url: "images/2020/10/21/us/politics/21lebron/merlin_178385838_8408c0b8-f624-4655-ab17-65dc03e1da45-articleLarge.jpg" }
                ]
            }
        }
    },
    methods: {
        async initializeArticle() {
            let url = this.$route.params.id || this.$props.id;
            await getArticle(url).then(value => {
                this.article = value.data.response.docs[0];
                console.log(this.article);
            })
        }
    },
    mounted() {
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