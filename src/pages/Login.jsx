import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firestore/firebaseConfig";
import { logout, selectUser } from "../store/userSlice";
import userAuth from "../userAuth/userAuth";

const Login = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // to sign out user
  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/signup");
      })
      .catch((error) => {});
  };

  // to handle profile
  const { currentUser } = userAuth();

  return (
    <div className="  text-white bg-who h-screen w-full">
      <div className="my-10 container mx-auto">
        <div className="flex items-center justify-between">
        
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
