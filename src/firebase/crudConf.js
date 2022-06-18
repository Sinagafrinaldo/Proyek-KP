import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBloxITVXv_GfaNTu6NXrosopeDrZav464",
    authDomain: "fir-auth-8bd54.firebaseapp.com",
    projectId: "fir-auth-8bd54",
    storageBucket: "fir-auth-8bd54.appspot.com",
    messagingSenderId: "117136228006",
    appId: "1:117136228006:web:b28f7ab75464ec05387e67",
    measurementId: "G-PZ5NPF6CGE"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);