import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyVt6wukQjvDDXphW9wjU5wNxGkUXfEhs",
  authDomain: "first-pro-35fc9.firebaseapp.com",
  projectId: "first-pro-35fc9",
  storageBucket: "first-pro-35fc9.appspot.com",
  messagingSenderId: "970338881405",
  appId: "1:970338881405:web:9942ac93160cbdedee4614",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
