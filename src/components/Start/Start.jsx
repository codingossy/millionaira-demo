import React, { useRef, useState } from "react";
import logo from "../../assets/images/1672386690099.jpg";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firestore/firebaseConfig";
import { login } from "../../store/userSlice";

const Start = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAuth = async (e) => {
    e.preventDefault();

    try {
      const userDetails = await signInWithEmailAndPassword(
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

      // const userD = userDetails.userD;
      navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="text-white w-full h-full">
      <div className="container mx-auto flex flex-col items-center justify-center gap-y-5 my-5">
        <div>
          <img src={logo} alt="" className="w-32" />
        </div>

        <div className="text-center">
          <h1 className="text-xl capitalize text-center ">
            hello welcome to WWTBAM DEMO
          </h1>
          <p>
            created by{" "}
            <a
              className="text-blue-500 capitalize"
              href="https://twitter.com/codingossy"
            >
              ossy
            </a>
          </p>
          <p className="text-gray-500 text-xs">
            with help from google and chatGPT
          </p>
        </div>

        <form
          onSubmit={loginAuth}
          action=""
          className="my-5 flex w-full flex-col md:w-[50%]"
        >
          <label htmlFor="" className="mb-1">
            Email Address
          </label>
          <input
            className="mb-1 rounded-2xl bg-blue-300 p-1 px-2 font-medium text-black outline-none transition duration-300 ease-in-out focus:border-blue-800"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="" className="mb-1">
            Password
          </label>
          <input
            className="mb-5 rounded-2xl bg-blue-300 p-1 px-2 font-medium text-black outline-none transition duration-300 ease-in-out focus:border-blue-800"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="my-3 w-full text-center">
            <button
              className="w-full rounded-2xl bg-blue-600 p-1 uppercase text-white transition-all duration-300 ease-in-out hover:bg-blue-400"
              // No need for onclick here as it prevents form validation
              // onClick={loginAuth}
              type="submit"
            >
              sign in
            </button>
          </div>
        </form>

        <div className="flex items-center gap-x-3">
          <hr className="w-44" />
          <span className="font-semibold text-gray-500">OR</span>{" "}
          <hr className="w-44" />
        </div>

        <div className="my-6 w-full text-center">
          <Link to="/signup">
            <button className="w-full max-w-[700px] rounded-2xl border-2 p-1 uppercase transition-all duration-300 ease-in-out hover:bg-black hover:text-white md:w-[50%]">
              create account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Start;
