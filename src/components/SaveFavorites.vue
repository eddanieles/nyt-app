<template>
  <div>
    <div v-if="showFavoriteButton">
        <button v-on:click="saveToFavorites()">Save To Favorites</button>
    </div>
    <div v-else>
        <p class="saved">saved on: {{savedDate}}</p>
        <span>Remove from Favorites</span><br>
        <router-link :to="`/profile/favorites`">Go To Favorites</router-link>
    </div>
  </div>
</template>

<script>
import { favoritesCollection } from '@/firebase'
import { auth } from '../firebase'
import moment from 'moment'

export default {
    data() {
        return {
            showFavoriteButton: true,
            savedDate: ""
        }
    },
    methods: {
        saveToFavorites() {
            this.$store.dispatch('createFavorite', {
                articleId : this.$route.params.id
            })
        },
        async checkFavorites() {
            let that = this;
            favoritesCollection.where("userId", "==", auth.currentUser.uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        if (doc.data().articleId === that.$route.params.id) {
                            that.showFavoriteButton = !that.showFavoriteButton; 
                            that.savedDate = moment(doc.data().createdOn.toDate()).format("MM/DD/YYYY");
                        }
                    })
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    },
    beforeMount() {
        this.checkFavorites();
    }
}
</script>

<style>

</style>