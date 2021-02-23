import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MASSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

// export const login = async (email, password) => {
//     const resp = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);
//     return resp.user;
// };
//
// export const getCurrentUser = async () => {
//      const unsubscribe = await firebase.auth().onAuthStateChanged(user => {
//         return user    })
// }
//
// export const getToken = async (user) => {
//     await user.getIdToken().then(function(idToken) {
//         return idToken;
//     });
// }