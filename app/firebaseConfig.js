// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRQ0p2FbZA4GvH-P--vNiVnhDKtKph6oU",
  authDomain: "next-firebase-crud-2690b.firebaseapp.com",
  projectId: "next-firebase-crud-2690b",
  storageBucket: "next-firebase-crud-2690b.appspot.com",
  messagingSenderId: "266319613458",
  appId: "1:266319613458:web:5fa63028fbae0c7ff4d2cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};