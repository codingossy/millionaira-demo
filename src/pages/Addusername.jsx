// imports from react
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

import userAuth from "../userAuth/userAuth";

//import from firebase
import { db } from "../firestore/firebaseConfig";
import { doc, updateDoc, setDoc } from "firebase/firestore";

const Addusername = () => {

    //setting the state username
    const [username, setUsername] = useState("");

    //fetching the user details
    const { currentUser } = userAuth();
    let userId = currentUser.uid;


    let navigate = useNavigate();

    //function to validate form
    const validateForm = () => {
        let isValid = true
        
        //if the input field is empty: this trows an error
        if (username == '' ) {
            isValid = false
            toast.error('invalid credential')
        }

        return isValid
    }

    //function to update the user's username
    const updateUser = (e) => {
        e.preventDefault();

        //checking if the form is validated
        if (validateForm()) {
            
            //updating the username
            updateDoc(doc(db, 'users', userId), {
                username: username
            })
            //this runs when successful
            .then((res) => {
                toast.success("success")
                navigate("/home")
            })
            //if an error occurs || this stores the entire user details in the database
            .catch(async(err) => {

                let userInfo = {
                username: username,
                email: user.email,
                uid: userId
                }
                
                //adding the users full details(including the username) to the users collection database
                await setDoc(doc(db, 'users', userId), userInfo);

                navigate("/home")
            })
        }
    }

    return ( 
        // this form was copied from register just changed the functions
        <div className="container mx-auto flex my-5 h-screen flex-col text-white">

        <div className="container my-8 mx-auto flex w-full max-w-[700px] flex-col items-center justify-center md:my-5">
          <h1 className="text-left text-4xl capitalize">Add Username</h1>

          <form
            onSubmit={updateUser}
            action=""
            className="my-5 flex w-full flex-col capitalize md:w-[70%]"
          >
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

            <div className="my-3 w-full text-center">
              <button
                className="w-full rounded-2xl bg-blue-600 p-1 uppercase text-white transition-all duration-300 ease-in-out hover:bg-blue-400"
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
    </div>
    </div>
     );
}
 
export default Addusername;