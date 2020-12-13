<template>
  <div>
    <Article />
    <div v-if="showFavoriteButton">
        <router-link :to="`/profile/favorites`">
            <button v-if="showFavoriteButton" v-on:click="saveToFavorites()">Save To Favorites</button>
        </router-link>
    </div>
    <div v-else>
        <p class="saved">saved on: {{savedDate}}</p>
    </div>
  </div>
</template>

<script>
import Article from '../components/Article'
import { favoritesCollection } from '@/firebase'
import { auth } from '../firebase'
import _ from 'underscore'
import moment from 'moment'

export default {
    data() {
        return {
            showFavoriteButton: true,
            savedDate: ""
        }
    },
    components: {
        Article
    },
    methods: {
        saveToFavorites() {
            this.$store.dispatch('createFavorite', {
                articleId : this.$route.params.id
            })
        },
        async checkFavorites() {
            const docs = await favoritesCollection.where('userId', '==', auth.currentUser.uid).get();
            
            const renderedArray = docs.docs.map(doc => {
                let renderedObj = doc.data();
                return renderedObj;
            });

            const foundFavorite = _.find(renderedArray, favorite => favorite.userId === auth.currentUser.uid && favorite.articleId === this.$route.params.id);

            if(foundFavorite)  {
                this.showFavoriteButton = !this.showFavoriteButton; 
                this.savedDate = moment(foundFavorite.createdOn.toDate()).format("MM/DD/YYYY");
            }
        }
    },
    beforeMount() {
        this.checkFavorites();
    }
}
</script>

<style>

</style>