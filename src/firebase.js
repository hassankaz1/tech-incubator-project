// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBkZ6R_xadbvGLq9pGGxyLYwHK51gzBehM",
//     authDomain: "tech-inc-e0025.firebaseapp.com",
//     projectId: "tech-inc-e0025",
//     storageBucket: "tech-inc-e0025.appspot.com",
//     messagingSenderId: "703757534699",
//     appId: "1:703757534699:web:b65e21f13e4a5dde1585ae",
//     measurementId: "G-XQG33WF3VR"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);



// export default app;
export { auth, db };