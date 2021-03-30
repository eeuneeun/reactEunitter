  
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQXpdwxGAhafcIrf1Lo3GGRE2YFCx-T7c",
    authDomain: "eunitter-a311d.firebaseapp.com",
    projectId: "eunitter-a311d",
    storageBucket: "eunitter-a311d.appspot.com",
    messagingSenderId: "205963816858",
    appId: "1:205963816858:web:aa6c1928db896411969423"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();