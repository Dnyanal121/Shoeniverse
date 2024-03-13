import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlCXJR850HuRXfZTYc7RXeNM7zODmmnRk",
  authDomain: "shoeniverse-project.firebaseapp.com",
  projectId: "shoeniverse-project",
  storageBucket: "shoeniverse-project.appspot.com",
  messagingSenderId: "835660435252",
  appId: "1:835660435252:web:1a1dd68bbd36eb8f909f61",
  measurementId: "G-7TYDXH7473"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
