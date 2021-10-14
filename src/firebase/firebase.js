import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyA-Qhic97iyNtc7-phQqQ4x6uIoepKNE7I",
    authDomain: "pfe2020-fba1d.firebaseapp.com",
    databaseURL: "https://pfe2020-fba1d.firebaseio.com",
    projectId: "pfe2020-fba1d",
    storageBucket: "pfe2020-fba1d.appspot.com",
    messagingSenderId: "355898058376",
    appId: "1:355898058376:web:7460362bf6843f7f2fe13d",
    measurementId: "G-30Y6Y5X925"
})

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export default firebase

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);