import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/firebase-storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCxe3mGib5A5_Bwnj7pvRY7gefnFtOObuA",
    authDomain: "beyond-timeline-d9c3d.firebaseapp.com",
    databaseURL: "https://beyond-timeline-d9c3d.firebaseio.com",
    projectId: "beyond-timeline-d9c3d",
    storageBucket: "beyond-timeline-d9c3d.appspot.com",
    messagingSenderId: "405322336177",
    appId: "1:405322336177:web:9fc4a372b4e49b10cc9f90"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider

export default function setFirebase (Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
        get () {
            return firebaseApp
        }
    })
}