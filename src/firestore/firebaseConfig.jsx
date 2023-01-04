// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzihk1irMRboxWSfYISJZI3C7-UppqUDw",
  authDomain: "tesclone.firebaseapp.com",
  projectId: "tesclone",
  storageBucket: "tesclone.appspot.com",
  messagingSenderId: "790739977211",
  appId: "1:790739977211:web:dbb20839cb8bdb4e60015e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)


export default app