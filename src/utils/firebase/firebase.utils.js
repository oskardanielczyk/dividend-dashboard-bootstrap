import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl2fwh0r7H_Of2pPTIiHVz_mTkIS5FE_M",
  authDomain: "dividash-8e62f.firebaseapp.com",
  projectId: "dividash-8e62f",
  storageBucket: "dividash-8e62f.appspot.com",
  messagingSenderId: "656593881468",
  appId: "1:656593881468:web:c6a58c563daccf981abcf9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();

export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = await doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const stock = [];

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        stock,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const getUserStocks = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  const { stock: stocks } = userSnapShot.data();

  return stocks;
};

export const updateUserStocks = async (userAuth, stock) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  const { stock: stocks } = userSnapShot.data();
  stock = [...stocks, stock];

  if (userSnapShot.exists()) {
    try {
      await updateDoc(userDocRef, { stock });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};
