// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";



// import firebase from 'firebase/app'
// import 'firebase/firestore'

if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyDhcecvsr-rQBQU7AMaEri-Tdj8o6303d0",
        authDomain: "ks-team-builder.firebaseapp.com",
        databaseURL: "https://ks-team-builder.firebaseio.com",
        projectId: "ks-team-builder",
        storageBucket: "ks-team-builder.appspot.com",
        messagingSenderId: "218291553561",
        appId: "1:218291553561:web:7ca63e0ba2df6c3a577188",
        measurementId: "G-XK1L15JWHD"
      };

    firebase.initializeApp(firebaseConfig)
}

const fireFirestore = firebase.firestore(),
      fireDatabase = firebase.database(),
      fireStorage = firebase.storage()

export { 
	fireFirestore, fireDatabase, fireStorage
}