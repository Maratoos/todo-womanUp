import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAV7zDn_i_55vzx9wVc_fqOel8w-OAeY5c",
  authDomain: "todo-494d0.firebaseapp.com",
  projectId: "todo-494d0",
  storageBucket: "todo-494d0.appspot.com",
  messagingSenderId: "968798185640",
  appId: "1:968798185640:web:10e68192198d438c923a9d"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)