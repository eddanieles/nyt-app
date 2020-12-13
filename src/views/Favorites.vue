<template>
  <div>
      <div>Current Favorites</div>
      <ul>
          <li v-for="favorite in favorites" :key="favorite.id">
            <p>article: {{favorite.articleId}}</p>
            <p>created: {{favorite.date}}</p>
          </li>
      </ul>
  </div>
</template>

<script>
import { favoritesCollection } from '@/firebase'
import { auth } from '../firebase'
import moment from 'moment'

export default {
    data() {
        return {
            favorites: []
        }
    },
    methods: {
        async getFavorites() {
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

</style>