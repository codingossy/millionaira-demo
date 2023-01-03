import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../store/userSlice";
import { useDispatch } from "react-redux";

//firebase import
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firestore/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import logo from "../assets/images/logo.png";

import { toast } from 'react-toastify'


const Register = () => {

  //setting the state of the form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

    //function to validate form
    const validateForm = () => {
        let isValid = true
        
        //if the input field is empty: this trows an error
        if (username == '' || email == '' || password == '' ) {
            isValid = false
            toast.error('invalid credential')
        }

        return isValid
    }
  const signupAuth = async (e) => {
    e.preventDefault();
      //checking if the form is validated
    if (validateForm()) {
    try {
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async(user) => {
        
        //getting the user uid
        let userId = user.user.uid;

        //storing the user's information in an object
        let userInfo = {
          username: username,
          email: email,
          uid: userId
        }
        //storing the user's information in the users collectionn
        await setDoc(doc(db, 'users', userId), userInfo);
        dispatch(
          login({
            email: user.user.email,
            uid: user.user.uid,
            username: user.user.username,
          })
        );  



        

      });

      navigate("/login");

      // const user = userDetails.user
    } catch (err) {
  
       if(err.message == "Firebase: Error (auth/email-already-in-use)."){
         toast.error("email already exist") 
      }
      else if (err.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        toast.error("your password is too short please retry")
        }
    }
  }
  };

  return (
    <div className="container mx-auto flex my-5 h-screen flex-col text-white">
 
        <div className=" flex items-center justify-center">
          <img src={logo} alt="" className="w-32" />
        </div>

        <div className="container my-8 mx-auto flex w-full max-w-[700px] flex-col items-center justify-center md:my-5">
          <h1 className="text-left text-4xl capitalize">create account</h1>

          <form
            onSubmit={signupAuth}
            action=""
            className="my-5 flex w-full flex-col capitalize md:w-[70%]"
          >
            {/* added an input for username */}
            <div className="my-2 flex flex-col gap-y-1">
              <label htmlFor="">username</label>
              <input
                className="rounded-2xl bg-blue-300 p-1 px-2 font-medium text-black outline-none transition duration-300 ease-in-out focus:border-blue-800"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="my-2 flex flex-col gap-y-1">
              <label htmlFor="">email Address</label>
              <input
                className="rounded-2xl bg-blue-300 p-1 px-2 font-medium text-black outline-none transition duration-300 ease-in-out focus:border-blue-800"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="my-2 flex flex-col gap-y-1">
              <label htmlFor="">password</label>
              <input
                className="rounded-2xl bg-blue-300 p-1 px-2 font-medium text-black outline-none transition duration-300 ease-in-out focus:border-blue-800"
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="my-3 w-full text-center">
              <button
                className="w-full rounded-2xl bg-blue-600 p-1 uppercase text-white transition-all duration-300 ease-in-out hover:bg-blue-400"
                // onClick={signupAuth}
                type="submit"
              >
                create account
              </button>
            </div>
          </form>

          <div className="flex items-center gap-x-3">
            <hr className="w-44" />
            <span className="font-semibold text-gray-500">OR</span>{" "}
            <hr className="w-44" />
          </div>

          <div className="my-6 w-full text-center">
            <Link to="/">
              <button className="w-full max-w-[700px] rounded-2xl border-2 p-1 uppercase transition-all duration-300 ease-in-out hover:bg-black hover:text-white md:w-[70%]">
                login
              </button>
            </Link>
          </div>
        </div>


    </div>
  );
};

export default Register;
