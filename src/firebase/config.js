import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLcuoaMnAb2_pl9yuaKIFj3OtbDaU6Yfo",
  authDomain: "social-media-app-b6de9.firebaseapp.com",
  projectId: "social-media-app-b6de9",
  storageBucket: "social-media-app-b6de9.appspot.com",
  messagingSenderId: "683593184108",
  appId: "1:683593184108:web:1e8da3ed74fb0e11e03949",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
