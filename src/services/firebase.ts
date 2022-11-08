
import firebase from 'firebase';

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBO61QxWMnCcGKbRnh5w1sXDzyIhT-tRhc",
  authDomain: "breeze-ask.firebaseapp.com",
  databaseURL: "https://breeze-ask-default-rtdb.firebaseio.com",
  projectId: "breeze-ask",
  storageBucket: "breeze-ask.appspot.com",
  messagingSenderId: "690566737613",
  appId: "1:690566737613:web:8f6b0f3522e60132f00384"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }