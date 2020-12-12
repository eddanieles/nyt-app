import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyAhuBNEsgjPxuIdR3fB7fz39vnw1GroOGg",
    authDomain: "kininsurance-6287d.firebaseapp.com",
    projectId: "kininsurance-6287d",
    storageBucket: "kininsurance-6287d.appspot.com",
    messagingSenderId: "65646899848",
    appId: "1:65646899848:web:acffaa86f57622bf33653d",
    measurementId: "G-XY2CQ4TPZ2"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}