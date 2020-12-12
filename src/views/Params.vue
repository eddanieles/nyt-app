<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <ul>
        <li v-for="article in articles" :key="article.id">

        </li>
    </ul>
  </div>
</template>

<script>
import { getArticles } from '../services/ApiService'

export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null,
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
    async fetchData () {
    //   this.error = this.post = null
    //   this.loading = true
    //   const fetchedId = this.$route.params.id
      // replace `getPost` with your data fetching util / API wrapper
    //   getArticles(fetchedId, (err, post) => {
    //     // make sure this request is the last one we did, discard otherwise
    //     if (this.$route.params.id !== fetchedId) return
    //     this.loading = false
    //     if (err) {
    //       this.error = err.toString()
    //     } else {
    //       this.post = post
    //     }
    //   })
        console.log(await getArticles("headlines"));
    }
  }
}
</script>

<style>

</style>