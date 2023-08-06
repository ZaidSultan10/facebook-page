// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBSZ-tUOdOUvEILrGB95jUwIZDtBpv288",
  authDomain: "facebook-accounts-dcbc8.firebaseapp.com",
  projectId: "facebook-accounts-dcbc8",
  storageBucket: "facebook-accounts-dcbc8.appspot.com",
  messagingSenderId: "1078700850717",
  appId: "1:1078700850717:web:4c72124572883de84450f4",
  measurementId: "G-8EKFH4H69K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);