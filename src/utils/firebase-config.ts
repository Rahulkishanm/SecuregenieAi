// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,setPersistence,browserLocalPersistence,signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLoDDlq8xRNXH3uvTCvwBPIZp302zG8NQ",
  authDomain: "chrome-extension-gpt-util.firebaseapp.com",
  projectId: "chrome-extension-gpt-util",
  storageBucket: "chrome-extension-gpt-util.appspot.com",
  messagingSenderId: "998134105401",
  appId: "1:998134105401:web:c660c43faf0146645b54e8",
  measurementId: "G-RBJHLC64TY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence).then(() => {
//   const provider = new GoogleAuthProvider();
//   // In memory persistence will be applied to the signed in Google user
//   // even though the persistence was set to 'none' and a page redirect
//   // occurred.
//   return signInWithRedirect(auth, provider);
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, firestore, provider };
