import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8uPdcgI_69MfmWNSAd98aNke8xYSRiKM",
  authDomain: "barcodewifiapp.firebaseapp.com",
  projectId: "barcodewifiapp",
  storageBucket: "barcodewifiapp.firebasestorage.app",
  messagingSenderId: "209534063685",
  appId: "1:209534063685:web:1ffdb57e0c95152a267f2c",
  measurementId: "G-KT8B3JM4PX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
