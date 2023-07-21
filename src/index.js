import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB391_wcDq9GCSB5yhbXUEMQayufQi89fI",
  authDomain: "react-chat-bed28.firebaseapp.com",
  projectId: "react-chat-bed28",
  storageBucket: "react-chat-bed28.appspot.com",
  messagingSenderId: "564008255951",
  appId: "1:564008255951:web:819aa7ea95b32b698692ba",
};

const app = initializeApp(firebaseConfig);
export const Context = createContext(null);
const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      auth,
      firestore,
    }}
  >
    <App />
  </Context.Provider>
);
