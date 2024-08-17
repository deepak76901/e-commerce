// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrG2oc9kkRD9BueM5HptQE8tTWXVO--I8",
  authDomain: "e-commerce-app-30fc4.firebaseapp.com",
  projectId: "e-commerce-app-30fc4",
  storageBucket: "e-commerce-app-30fc4.appspot.com",
  messagingSenderId: "980313079604",
  appId: "1:980313079604:web:4f3f49adad29eca50daf61",
  measurementId: "G-HDVLR0E1QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;