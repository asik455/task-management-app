import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_kqIn0uhAGlPxtONVn9gaxWPZmzfa9uI",
  authDomain: "task-ea9e9.firebaseapp.com",
  projectId: "task-ea9e9",
  storageBucket: "task-ea9e9.firebasestorage.app",
  messagingSenderId: "230583526501",
  appId: "1:230583526501:web:1fc45f5c26c51dbadad28c",
  measurementId: "G-087CHWW29N"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
