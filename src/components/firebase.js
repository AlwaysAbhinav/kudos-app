// filepath: /C:/Users/User/Projects/kudos-app/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRbJhmEQDQ1VnshTwbKV71QkeZ8e7vC-g",
  authDomain: "kudos-b3682.firebaseapp.com",
  projectId: "kudos-b3682",
  storageBucket: "kudos-b3682.firebasestorage.app",
  messagingSenderId: "449671507046",
  appId: "1:449671507046:web:e4a07930db02a2eb0a11a7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      console.log("User Info:", user);
      // Redirect or perform any other actions after successful login
            // Store user data in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              profileImage: user.photoURL,
            });
      
            // Redirect or perform any other actions after successful login
            window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
    });
};

const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        window.location.href = "/login"; // Redirect to login page after sign out
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

const getCurrentUser = (callback) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
  };

export { auth, signInWithGoogle, signOutUser, getCurrentUser };