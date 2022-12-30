import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firestore/firebaseConfig";
import { login } from "../store/userSlice";


import logo from "../assets/images/1672386690099.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupAuth = async (e) => {
    e.preventDefault();

    try {
      const userDetails = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((user) => {
        dispatch(
          login({
            email: user.user.email,
            uid: user.user.uid,
            displayName: user.user.displayName,
          })
        );
      });

      navigate("/login");

      // const user = userDetails.user
    } catch (error) {}
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
