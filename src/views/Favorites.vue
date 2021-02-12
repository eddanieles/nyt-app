<template>
  <div>
      <div>Current Favorites</div>
      <ul>
        <li v-for="favorite in favorites" :key="favorite.id">
            <router-link :to="`/article/${encodeURIComponent(favorite.articleId)}`">
                <p>{{favorite.articleTitle}}</p>
                <div v-if="favorite.articleMedia.length > 0 && favorite.articleMedia[0].url">
                    <img v-if="/^http/.test(favorite.articleMedia[0].url)" class="article-image" v-bind:src="`${favorite.articleMedia[0].url}`" alt="">
                    <img v-else class="article-image" v-bind:src="`https://www.nytimes.com/${favorite.articleMedia[0].url}`" alt="">
                </div>
                <div v-else>
                </div>
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
import { mapState } from 'vuex'

export default {
    data() {
        return {
            favorites: []
        }
    },
    computed: {
        ...mapState(['userProfile']),
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
        console.log("inside Favorites: " + JSON.stringify(this.userProfile))
    }
}
</script>

<style>
.saved {
    font-size: small;
}
</style>