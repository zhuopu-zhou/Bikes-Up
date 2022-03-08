// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmHWAaQST70tEjqeYFzE6gpWa2bK3OyKs",
  authDomain: "auth-test-zz.firebaseapp.com",
  projectId: "auth-test-zz",
  storageBucket: "auth-test-zz.appspot.com",
  messagingSenderId: "563487030429",
  appId: "1:563487030429:web:b4dadc50267ce81618a874",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//...