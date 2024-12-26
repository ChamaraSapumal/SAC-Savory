import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0x5IYZUevUhMofoQ1_GLU508BlQoQxlk",
  authDomain: "sac-savory.firebaseapp.com",
  projectId: "sac-savory",
  storageBucket: "sac-savory.appspot.com",
  messagingSenderId: "504436874541",
  appId: "1:504436874541:web:583d4ea1acec2e61ac07a4",
  measurementId: "G-1JBBSFRR2V",
  databaseURL:
    "https://sac-savory-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Realtime Database
export const db = getDatabase(app);

// Export the `app` to use it in other files
export { app };

// Example of a function to write user data to the database
export const writeUserData = (
  userId,
  firstName,
  lastName,
  email,
  address,
  phoneNumber
) => {
  set(ref(db, "users/" + userId), {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
  });
};

// Example of how you can sign in with Firebase Authentication
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in: ", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw new Error("Invalid login credentials. Please try again.");
  }
};

// Example of how you can sign out a user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

// Example of how to read data from the database
export const readUserData = async (userId) => {
  try {
    const userRef = ref(db, "users/" + userId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error reading data: ", error);
  }
};
