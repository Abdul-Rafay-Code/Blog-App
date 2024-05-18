import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCX_xZyV1OCFu8YIIe8Lu-9JCDm5tNlrnY",
  authDomain: "blogs-1e75d.firebaseapp.com",
  projectId: "blogs-1e75d",
  storageBucket: "blogs-1e75d.appspot.com",
  messagingSenderId: "135068507945",
  appId: "1:135068507945:web:be7d51568017bb23a1a138"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firedb = getFirestore(app);
const storage = getStorage(app);

export {auth,firedb,storage};