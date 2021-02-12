import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
            console.log("in setUserProfile: " + state.userProfile)
        }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title,
                email: form.email
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state        
            commit('setUserProfile', userProfile.data())
            console.log("in fetchUserProfile: " + userProfile.data());

            // change route to dashboard
            router.push('/')
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})
            console.log("in login: ");

            // redirect to login view
            router.push('/login')
        },
        async createFavorite({ commit }, articleId) {
            console.log(commit)
                // create post in firebase
            await fb.favoritesCollection.add({
                createdOn: new Date(),
                articleId: articleId.articleId,
                userId: fb.auth.currentUser.uid,
                articleMedia: articleId.articleMedia,
                articleTitle: articleId.articleTitle
            })
        },
        async deleteFavorite({ commit }, articleId) {
            console.log(commit)
                // delete post in firebase
            await fb.favoritesCollection.where('userId', '==', articleId.userId).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.data().articleId === articleId.articleId) {
                            doc.ref.delete()
                        }
                    })
                })
        }
    }
})

export default store