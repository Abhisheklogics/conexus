import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey:'AIzaSyBmAOUcpDDTzbjUfzK41ulT3rr9AvAZxz8',
  authDomain:'conexus-f02ea.firebaseapp.com',
  projectId:'conexus-f02ea',
  storageBucket:'conexus-f02ea.appspot.com',
  messagingSenderId:'896300474594',
  appId:'1:896300474594:web:45ecfb67a872631a2f7ebb',
  measurementId:'G-018Y88JNCZ',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
