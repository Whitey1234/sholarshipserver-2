// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNw9gfJD9j2ol32RL9VG3RKMsdadU478w",
  authDomain: "student-cholarshif-ass-12.firebaseapp.com",
  projectId: "student-cholarshif-ass-12",
  storageBucket: "student-cholarshif-ass-12.firebasestorage.app",
  messagingSenderId: "204235333196",
  appId: "1:204235333196:web:3045ae186b7b6bec135ee9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);