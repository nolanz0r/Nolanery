import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwKhPiUnZECB-tpwzYmkTA5z1yjzjb0dQ",
  authDomain: "react-gallery-9f127.firebaseapp.com",
  projectId: "react-gallery-9f127",
  storageBucket: "react-gallery-9f127.appspot.com",
  messagingSenderId: "64665724715",
  appId: "1:64665724715:web:39a5a74119439c0156076e",
};

firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
