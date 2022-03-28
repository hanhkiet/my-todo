// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFvBhBeuJivuVjFozGyl8xDnBgUydTqsM",
    authDomain: "my-to-do-f4491.firebaseapp.com",
    projectId: "my-to-do-f4491",
    storageBucket: "my-to-do-f4491.appspot.com",
    messagingSenderId: "457177093833",
    appId: "1:457177093833:web:22398283d8ba6f58331f18",
    measurementId: "G-05CCJ643FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);