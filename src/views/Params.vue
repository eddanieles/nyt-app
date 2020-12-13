<template>
  <div class="post">
    <ul>
        <li v-for="article in articles" :key="article.id">
            {{article}}
        </li>
    </ul>
  </div>
</template>

<script>
import { getArticles } from '../services/ApiService'

export default {
  data () {
    return {
      articles: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
        getArticles("kin insurance").then(value => {
            this.articles = value.data.response.docs;
        })
    }
  }
}
</script>

<style>

</style>