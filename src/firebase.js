// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, remove } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeyG1RwPnriDR7784z-5bLAM_yGM2hXB4",
  authDomain: "vikramahackthon.firebaseapp.com",
  projectId: "vikramahackthon",
  storageBucket: "vikramahackthon.firebasestorage.app",
  messagingSenderId: "204474649738",
  appId: "1:204474649738:web:6a1f2a8af20eb2e5a93173"
  // Realtime Database URL is automatically generated
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Export as named exports
export { database, ref, push, set, onValue, remove };