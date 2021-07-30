import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
var firebaseConfig = {
  apiKey: "AIzaSyALMhRRoGyTcuRR54_uDVIAiLLTjf96-dE",
  authDomain: "simple-notes-firebase-24515.firebaseapp.com",
  projectId: "simple-notes-firebase-24515",
  databaseURL:"https://simple-notes-firebase-24515-default-rtdb.firebaseio.com/",
  storageBucket: "simple-notes-firebase-24515.appspot.com",
  messagingSenderId: "775766843848",
  appId: "1:775766843848:web:82a42b8de048528157e0fd",
  measurementId: "G-BVP0XX6TQ6"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
  export const database = firebase.database()
//   firebase.analytics();

  export default firebase;