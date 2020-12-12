<template>
  <div>
    <p>{{article.headline.main === "No Headline" ? null : article.headline.main}}</p>
    <p>{{article.byline.person.length >= 1 ? article.byline.person.map(person => {
                            return `${person.firstname} ${person.lastname}`
                        }) : null
                    }}
    </p>
    <p>{{article.lead_paragraph}} 
        <a v-bind:href="`${article.web_url}`">...read full article</a>
    </p>

  </div>
</template>

<script>
import { getArticle } from '../services/ApiService'

export default {
    name: 'Article',
    data() {
        return {
            article: {}
        }
    },
    methods: {
        initializeArticle() {
            getArticle(this.$route.params.id).then(value => {
                this.article = value.data.response.docs[0];
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