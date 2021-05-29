import firebase from 'firebase/app'

import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDSnWIuiXkLhr2EKjOIn-O6bt08cLP-4Y",
  authDomain: "bolt-fasting.firebaseapp.com",
  projectId: "bolt-fasting",
  storageBucket: "bolt-fasting.appspot.com",
  messagingSenderId: "508202112239",
  appId: "1:508202112239:web:62aae58b60b7f7c301b71a",
  measurementId: "G-0WH8MNZB2L"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


export { auth, GoogleAuthProvider };