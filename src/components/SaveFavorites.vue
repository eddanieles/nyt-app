<template>
  <div>
    <div v-if="showFavoriteButton">
        <div v-if="currentUser">
            <button v-on:click="saveToFavorites()">Save To Favorites</button>
        </div>
        <div v-else-if="!currentUser">
            <router-link to="/login">Sign in to save article.</router-link>
        </div>
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
            currentUser: true,
            showFavoriteButton: true,
            savedDate: ""
        }
    },
    methods: {
        saveToFavorites() {
            if (!auth.currentUser) {
                this.currentUser = false;
                return
            }
            this.$store.dispatch('createFavorite', {
                articleId : this.$route.params.id
            })
            this.forceRerender();
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
        },
        forceRerender() {
            this.checkFavorites();
        }
    },
    beforeMount() {
        auth.currentUser ? this.checkFavorites() : null;
    }
}
</script>

<style>

</style>