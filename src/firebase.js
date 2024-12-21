import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBVpP4g6eTCjQUZaO1rW6BZgD4Q4NPR8js",
    authDomain: "order-app-8c499.firebaseapp.com",
    databaseURL: "https://order-app-8c499-default-rtdb.firebaseio.com",
    projectId: "order-app-8c499",
    storageBucket: "order-app-8c499.firebasestorage.app",
    messagingSenderId: "205866200994",
    appId: "1:205866200994:web:2a16ff5131ea92aa634cfb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);