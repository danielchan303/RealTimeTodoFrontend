import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC4icTj2AMc_R6iVVEd8_9vN4EryHPCo6g",
    authDomain: "realtime-todo-daniel-chan.firebaseapp.com",
    databaseURL: "https://realtime-todo-daniel-chan.firebaseio.com",
    projectId: "realtime-todo-daniel-chan",
    storageBucket: "realtime-todo-daniel-chan.appspot.com",
    messagingSenderId: "441257112335",
    appId: "1:441257112335:web:2e28c0ec4454e08a1e847a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;