import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/animated-balloon-image-0002.gif";
import { db } from "../../firestore/firebaseConfig";

const Winner = ({ username, earned, restartGame, setUsernames, usernames }) => {

  
  useEffect(() => {
    const fetchItems = async () => {
      const docRef = doc(db, "users", userId);

      const docSnap = await getDoc(docRef);
              
        if (docSnap.exists()) {
          setUsernames(docSnap.data().username);
          }

        }
    fetchItems();
    }, []);


  return (
    <div className="w-full h-full relative">
      <div className="container mx-auto flex flex-col items-center text-center justify-center text-white my-20">
        <h1 className="my-5">congratulations padi mi <span className="text-red-600 text-xl font-semibold">{usernames}</span></h1>
        <p className="text-2xl capitalize">
          you just won yourself{" "}
          <span className="text-green-700 font-semibold">{earned}</span>
        </p>
        <p className="text-xs">find something for boys eje mi</p>

        <div className="relative my-5">
          <img src={img1} alt="" className="" />
          <img src={img1} alt="" className="" />
          <img src={img1} alt="" className="" />
          <img src={img1} alt="" className="" />
        </div>

        <Link to={`/home`}>
          <button
            onClick={restartGame}
            className="capitalize text-2xl font-semibold my-10 bg-green-500 px-10 p-2 rounded-sm"
          >
            restart game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Winner;
