// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ1Qt0HKDxKg7KP3vq6dcwLTbZXyJIJPY",
  authDomain: "enter-subscriptions.firebaseapp.com",
  projectId: "enter-subscriptions",
  storageBucket: "enter-subscriptions.firebasestorage.app",
  messagingSenderId: "946601419379",
  appId: "1:946601419379:web:6b6a816066702b2a67c006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;