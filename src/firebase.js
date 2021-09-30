// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAcc70zfTac9c5QmsNf0GUrdhIqrg8Ym8c',
  authDomain: 'flutterwavexreloadlyplantit.firebaseapp.com',
  projectId: 'flutterwavexreloadlyplantit',
  storageBucket: 'flutterwavexreloadlyplantit.appspot.com',
  messagingSenderId: '198403054910',
  appId: '1:198403054910:web:0bafae8a5c1ce97552a06f',
  measurementId: 'G-Z0JZHTN4GS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const AUTH = getAuth(app);
const DB = initializeFirestore(app, { ignoreUndefinedProperties: true });

export { AUTH, DB };
