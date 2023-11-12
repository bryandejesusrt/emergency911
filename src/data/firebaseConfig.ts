//farebase configuration file
// firebaseConfig.js
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCNRBUyMhqdz1KCMOf6gk7vDRYjKIs2urE",
  authDomain: "emergency911-77fea.firebaseapp.com",
  projectId: "emergency911-77fea",
  storageBucket: "emergency911-77fea.appspot.com",
  messagingSenderId: "549552582932",
  appId: "1:549552582932:web:aabf038b7e7f0bc086d201"
};

const app = initializeApp(firebaseConfig);

export default app;

