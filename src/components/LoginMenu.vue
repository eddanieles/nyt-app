<template>
    <div>
        <div v-if="userProfile.email">{{userProfile.email}}<a id="logout" @click="logout()">(logout)</a></div>
        <div v-else><router-link to="/login">Click here to login.</router-link></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '../firebase'

export default {
    computed: {
        ...mapState(['userProfile']),
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            console.log(auth.currentUser)
            console.log(JSON.stringify(this.userProfile))
        }
    }
}
</script>

<style>
#logout {
  font-size: x-small;
}
</style>