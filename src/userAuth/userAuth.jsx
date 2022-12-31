import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";

const userAuth = () => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("authuser", user)
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  },[onAuthStateChanged]);

  return {
    currentUser,
  };
};

export default userAuth;
