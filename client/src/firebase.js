import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbB-GG1b-NVBMJzBe_iokGCo3ea1bVMmM",
  authDomain: "flopshop-586f9.firebaseapp.com",
  projectId: "flopshop-586f9",
  storageBucket: "flopshop-586f9.firebasestorage.app",
  messagingSenderId: "853946853969",
  appId: "1:853946853969:web:2fa01bb8c024e50af8e670",
  measurementId: "G-1V9SYVHGWC"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);