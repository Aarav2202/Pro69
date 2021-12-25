import firebase from 'firebase'
require('@firebase/firestore')
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlkGNloRauKko1n5R-dt-xWJ-vanjbr4o",
  authDomain: "e-library-97017.firebaseapp.com",
  projectId: "e-library-97017",
  storageBucket: "e-library-97017.appspot.com",
  messagingSenderId: "23102868826",
  appId: "1:23102868826:web:44bd230419dac0f7f9b763"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore()