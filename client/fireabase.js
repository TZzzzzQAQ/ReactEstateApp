import {initializeApp} from "firebase/app";
import {googleApiKey} from "./config.js";

const firebaseConfig = {
    apiKey: googleApiKey,
    authDomain: "tzqestate.firebaseapp.com",
    projectId: "tzqestate",
    storageBucket: "tzqestate.appspot.com",
    messagingSenderId: "191541231691",
    appId: "1:191541231691:web:13a95ecf1c42cea1340dce"
};

export const firebaseApp = initializeApp(firebaseConfig);