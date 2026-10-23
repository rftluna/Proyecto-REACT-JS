// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//⚠️Esto no deberia compartirse en un proyecto real
//📚En este proyecto educativo, por simplicidad para todos, lo utilizamos asi
//👉A futuro lo reemplazarían por variables de entorno y archivo .env😉

const firebaseConfig = {
    apiKey: "AIzaSyBeZdCov9etJAaz-qN41BISRyNXtFI_gLY",
    authDomain: "c26242-9311b.firebaseapp.com",
    projectId: "c26242-9311b",
    storageBucket: "c26242-9311b.firebasestorage.app",
    messagingSenderId: "334726415504",
    appId: "1:334726415504:web:3bbfda27bb84b6a0570415"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//para el login
const auth = getAuth(app);

export { db, auth };
