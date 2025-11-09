import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAQ1Qt0HKDxKg7KP3vq6dcwLTbZXyJIJPY",
  authDomain: "enter-subscriptions.firebaseapp.com",
  projectId: "enter-subscriptions",
  storageBucket: "enter-subscriptions.firebasestorage.app",
  messagingSenderId: "946601419379",
  appId: "1:946601419379:web:6b6a816066702b2a67c006"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;