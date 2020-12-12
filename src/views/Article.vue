<template>
  <div>
    <div>{{$route.params.id}}</div>
    <div>{{article}}</div>
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