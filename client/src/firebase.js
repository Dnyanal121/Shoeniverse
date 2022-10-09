import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkbkazawUjw2RaBEMExOilQnTTxpkVl2A",
  authDomain: "croders-eshop.firebaseapp.com",
  projectId: "croders-eshop",
  storageBucket: "croders-eshop.appspot.com",
  messagingSenderId: "238704634786",
  appId: "1:238704634786:web:03c5af386d7a5af9c120fb",
  measurementId: "G-JGX0KN2GR6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
