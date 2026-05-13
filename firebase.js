// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDLTVlxiDK1TAokNin7aLORI8Yk9hB_dLo",
  authDomain: "smarttask-d846c.firebaseapp.com",
  projectId: "smarttask-d846c",
  storageBucket: "smarttask-d846c.firebasestorage.app",
  messagingSenderId: "1011010288117",
  appId: "1:1011010288117:web:15da42f7a53ee30509c8bc",
  measurementId: "G-7HSNTTWCJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

// Export
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc
};