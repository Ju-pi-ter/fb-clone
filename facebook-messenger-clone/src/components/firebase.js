// src/components/firebase.js
import firebase from 'firebase/compat/app'; // Change 'firebase/app' to 'firebase/compat/app'
import 'firebase/compat/auth'; // Change 'firebase/auth' to 'firebase/compat/auth'

const firebaseConfig = {
 
  apiKey: "AIzaSyBEFWjiMQBOgdNWPfsT57b5l6yi_DQkL-g",
  authDomain: "facebook-messenger-clone-bd2e6.firebaseapp.com",
  projectId: "facebook-messenger-clone-bd2e6",
  storageBucket: "facebook-messenger-clone-bd2e6.appspot.com",
  messagingSenderId: "468540118768",
  appId: "1:468540118768:web:6e9b010362fe119b9e9435",
  measurementId: "G-D11HWHF6F7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth, firebase }; // Remove the 'as default' part
