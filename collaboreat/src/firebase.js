// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "collaboreat-853cb.firebaseapp.com",
  projectId: "collaboreat-853cb",
  storageBucket: "collaboreat-853cb.appspot.com",
  messagingSenderId: "712694270890",
  appId: "1:712694270890:web:54b7525e20b8178056f9d3",
  measurementId: "G-EEKSQRC8SP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
