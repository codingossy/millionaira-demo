import { signOut } from "firebase/auth";
import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth,db } from "../firestore/firebaseConfig";
import { logout } from "../store/userSlice";
import userAuth from "../userAuth/userAuth";
import { doc, getDoc } from "firebase/firestore";

import { toast } from 'react-toastify'



const Login = () => {
  //all the react useState
  const [username, setUsername] = useState("");

  //all the react hooks
  const { currentUser } = userAuth();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  //setting the user uid
  let userId = currentUser.uid;


  //getting the users info from the database
  useEffect(() => {
    const fetchItems = async () => {
    const docRef = doc(db, "users", userId);

            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              setUsername(docSnap.data());
            } else {
              // doc.data() will be undefined in this case
              navigate("/username")
            }
        }
    fetchItems();
    }, [userId]);

  // to sign out user
  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        toast.error(error)
      });
  };



  return (
    <div className="  text-white bg-who h-screen w-full">
      <div className="mx-auto">
        <div className="px-6 py-6 w-full bg-primary flex items-center justify-between">
          <div className="text-xl font-semibold w-[80%]">
            welcome <span className="text-green-600 font-bold">{username.username || "user"},</span>
          </div>
          {/* added button to sign out */}
          <div>
            <button className="bg-accent px-6 py-3 rounded-lg" onClick={signUserOut}>logout</button>
          </div>
        </div>

        <div className="flex flex-col capitalize gap-y-5 items-center justify-center my-20">
          <h1> to play game</h1>
          <Link to={`/home`}>
            <button className="px-5 p-2 bg-green-600 text-white rounded-sm">
              click here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
