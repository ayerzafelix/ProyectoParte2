import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAwQrv90798xtCfsi5DcxJ5bgL-FVwwn7o",
  authDomain: "progra3firebase.firebaseapp.com",
  projectId: "progra3firebase",
  storageBucket: "progra3firebase.appspot.com",
  messagingSenderId: "456249522391",
  appId: "1:456249522391:web:cfe415811da72eda6e9892"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();