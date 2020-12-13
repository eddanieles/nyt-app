<template>
  <div>
      <div>Current Favorites</div>
      <ul>
        <li v-for="favorite in favorites" :key="favorite.id">
            <router-link :to="`/article/${encodeURIComponent(favorite.articleId)}`">
                <article-display :id="`${favorite.articleId}`"/>
                <p class="saved">saved on: {{favorite.date}}</p>
            </router-link>
        </li>  
      </ul>
  </div>
</template>

<script>
import { favoritesCollection } from '@/firebase'
import { auth } from '../firebase'
import moment from 'moment'
import ArticleDisplay from '../components/ArticleDisplay.vue'

export default {
    data() {
        return {
            favorites: []
        }
    },
    components: {
        ArticleDisplay,
    },
    methods: {
        async getFavorites() {
            if (!auth.currentUser) return;
            const docs = await favoritesCollection.where('userId', '==', auth.currentUser.uid).get();
            this.favorites = docs.docs.map(doc => {
                let renderedObj = doc.data();
                renderedObj.date = moment(renderedObj.createdOn.toDate()).format("MM/DD/YYYY");
                return renderedObj;
            });
        }
    },
    beforeMount() {
        this.getFavorites();
    }
}
</script>

<style>
.saved {
    font-size: small;
}
</style>