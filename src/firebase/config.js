
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import  {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDfQmUmLw4Vbr2p1AnrRrIjGPRArWOiNiM",
    authDomain: "olx-clone-c78c7.firebaseapp.com",
    projectId: "olx-clone-c78c7",
    storageBucket: "olx-clone-c78c7.appspot.com",
    messagingSenderId: "392876781527",
    appId: "1:392876781527:web:4bfff6f125b434caf2e592",
};

export const app=initializeApp(firebaseConfig); 
export const auth=getAuth(app);
export const db=getFirestore();
export const storage=getStorage();




 