import React, { useEffect, useMemo, useState } from "react";
import Timer from "../Timer/Timer";
import Trivia from "../Trivia/Trivia";
import { Questionnaire } from "../../data/QuestionsData";
import Winner from "../winner/Winner";
import Start from "../Start/Start";
import { useNavigate } from "react-router-dom";
import userAuth from "../../userAuth/userAuth";

const Home = () => {
  const navigate = useNavigate();
  // to set the user
  const [username, setUsername] = useState(null);
  //   time out count bewtween answers
  const [timeOut, setTimeOut] = useState(false);

  // start this at one which is the initial
  const [questionNumber, setQuestionNumber] = useState(1);

  //   detemine the amount earned
  const [earned, setEarned] = useState("₦ 0");
  // for the countdown
  const [timerRunning, setTimerRunning] = useState(true);

  const playAgain = () => {
    setQuestionNumber(1);
    setTimeOut(false);
    setEarned("₦ 0");
    setTimerRunning(true);
    // navigate('/')
  };

  const quitGame = () => {
    setTimerRunning(false);
    setTimeOut(true);
    navigate("/login");
  };

  const exitGame = () => {
    setTimerRunning(false);
    setUsername(null);
    setQuestionNumber(1);
    setEarned("₦ 0");
    navigate("/login");
  };

  //   monney array
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "₦100" },
        { id: 2, amount: "₦500" },
        { id: 3, amount: "₦1000" },
        { id: 4, amount: "₦10,000" },
        { id: 5, amount: "₦50,000" },
        { id: 6, amount: "₦100,000" },
        { id: 7, amount: "₦150,000" },
        { id: 8, amount: "₦200,000" },
        { id: 9, amount: "₦250,000" },
        { id: 10, amount: "₦300,000" },
        { id: 11, amount: "₦400,000" },
        { id: 12, amount: "₦640,000" },
        { id: 13, amount: "₦750,000" },
        { id: 14, amount: "₦880,000" },
        { id: 15, amount: "₦1,000,000" },
      ].reverse(),
    //an array method to reverse the order just like flex-direction: column reverse;
    []
  );

  //    to determine how much is earned
  // use the use effect to set earned from the moneyPryarmid
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);


  
  // to handle profile
  const { currentUser } = userAuth();


  return (
    <section className="w-full flex h-screen text-white">
      {/* start game if user is logged in */}

      {username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          {/* if user wins the game */}
          {questionNumber > 15 ? (
            <Winner
              username={username}
              earned={earned}
              restartGame={playAgain}
            />
          ) : (
            <>
              <div className="main flex-1 flex flex-col bg-red-400 w-full">
                {/* if user doesn complete game in 15 secs timeput and redirect page */}
                {timeOut ? (
                  <div className="flex flex-col items-center justify-center py-10  h-full w-full">
                    <p className=" font-semibold text-xl">
                      {/* hello, <span className="text-white font-semibold">{currentUser.email}</span> */}
                    </p>

                    <h1 className="text-center font-semibold text-2xl">
                      Congratulations, You won {earned}
                    </h1>

                    <div className="my-10">
                      <button
                        className="bg-green-700 px-5 p-2 rounded-sm"
                        onClick={playAgain}
                      >
                        Play Again
                      </button>
                    </div>

                    <div className="flex items-center gap-x-5 my-10 gap-y-5">
                      <div className="flex items-center gap-x-4">
                        <button
                          className="bg-red-500 px-5 p-1 rounded-sm"
                          onClick={quitGame}
                        >
                          Quit
                        </button>
                        <button
                          className="border px-5 p-1 rounded-sm"
                          onClick={exitGame}
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-[50%]">
                      <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center absolute left-10 top-28">
                        <Timer
                          setTimeOut={setTimeOut}
                          questionNumber={questionNumber}
                          timerRunning={timerRunning}
                          setTimerRunning={setTimerRunning}
                        />
                      </div>
                    </div>

                    <div>
                      <Trivia
                        data={Questionnaire}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        setTimeOut={setTimeOut}
                        setTimerRunning={setTimerRunning}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* second */}
              <div className="flex-initial w-24 md:w-72 flex items-center justify-center bg-[#020230]">
                <ul className="w-full p-1 md:p-3">
                  {moneyPyramid.map((moni, i) => (
                    <li
                      className={
                        questionNumber === moni.id
                          ? "flex items-center gap-x-2 p-1 rounded-md money active"
                          : "flex items-center gap-x-2 p-1 rounded-md money"
                      }
                      key={i}
                    >
                      <span className="w-32 font-semibold text-xs md:text-sm ">{moni.id}</span>
                      <span className="text-[12px] md:text-sm">{moni.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
