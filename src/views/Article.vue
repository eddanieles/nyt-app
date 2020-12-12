<template>
  <div>
    <p>{{article.title ? article.title : article.headline.main ? article.headline.main : null}}</p>
    <p>{{article.byline.person.length >= 1 ? article.byline.person.map(person => {
                            return `${person.firstname} ${person.lastname}`
                        }) : typeof article.byline === "string" ? article.byline : null
                    
        }}
    </p>
    <p>{{article.lead_paragraph}} 
        <a v-bind:href="`${article.web_url}`">...read full article</a>
    </p>
    <button>Save</button>
  </div>
</template>

<script>
import { getArticle } from '../services/ApiService'

export default {
    name: 'Article',
    data() {
        return {
            article: { 
                byline : {
                    person : []
                }, 
                headline : {
                    main : ""
                }
            }
        }
    },
    methods: {
        initializeArticle() {
            getArticle(this.$route.params.id).then(value => {
                this.article = value.data.response.docs[0];
                console.log(this.article);
            })
        }
    },
    mounted() {
        this.initializeArticle();
    }

}
</script>

<style>

</style>