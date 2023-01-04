import React, { useEffect, useState, useMemo } from "react";
import useSound from "use-sound";
import play from "../../assets/sounds/play.mp3";
import correct from "../../assets/sounds/correct.mp3";
import wrong from "../../assets/sounds/wrong.mp3";
import {
    phantomImg,
    favourImg,
    sageImg,
    frankImg,
} from "../../assets/index";
import PhoneTimer from "../Timer/PhoneTimer"

const initial_lifelines = {
  fiftyFifty: false,
  phoneAFriend: false,
  askAudience: false,
}

const Trivia = ({
  data,
  questionNumber,
  setTimerRunning,
  timerRunning,
  setQuestionNumber,
  setTimeOut,
  lifeline,
  phoneTimeOut,
  setPhoneTimeOut
}) => {
  // const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [activeButtons, setActiveButtons] = useState(true)
  const [Data, setData] = useState(data)
  const [usedLifeLines, setUsedLifelines] = useState(initial_lifelines)
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState(true)
  const [calling, setCalling] = useState(true)
  const [loading, setLoading] = useState(true)
  const [guessedAnswer, setGuessedAnswer] = useState("")
  const [selectedFriend, setSelectedFriend] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [filteredAnswers, setFilteredAnswers] = useState()

    // for the countdown
  const [phoneTimerRunning, setPhoneTimerRunning] = useState(true);


  // //   time out count bewtween answers
  // const [phoneTimeOut, setPhoneTimeOut] = useState(false);

  useEffect(() => {
      let timeOut = setTimeout(() => {
        setCalling(false);
      }, 7000);
  }, [setCalling]);
  
  useEffect(() => {
      let timeOut = setTimeout(() => {
        setLoading(false);
      }, 10000);
  }, [setLoading]);


  const Question = useMemo(()=>{
    // To shuffle the questions we generate a random number 
    // within the range of the data set
    const randomNumber = Math.floor(Math.random() * Data.length);
    // Also we clone the data set into a new array in order to update the 
    // data set and avoid repeating any questions that have been asked already
    const newData = [...Data]
    // Then we slice out that question from the data set so that when we 
    //  generate another random number for our index, that old question wont be there
    const question = newData.splice(randomNumber, 1)
    // We set the update the new data set and return the sliced out question
    setData(newData)
    return question[0]

  },[questionNumber])


  const Answers = useMemo(()=>{
    const answers = Question?.answers.sort(() => Math.random() - 0.5);



    if(lifeline.fiftyFifty && !usedLifeLines.fiftyFifty){
  
      // filter out all the wrong answers
     const wrongAnswers = answers.filter(answer=> !answer.correct);
    
     // generate random number to match index of all wrongAnswers
     const randomNumber = () => Math.floor(Math.random() * wrongAnswers.length);

     // find the selected wrongAnswer with the gen. random number
     const selectedWrongAnswer = wrongAnswers[randomNumber()];


     const lifeline_5050_answers = answers.map((answer, index, arr)=>{
      // if answer is correct or answer matches the 
      // random number selected wrong answer, return that answer
      // otherwise, return answer with empty text
        if(answer.correct || (answer.text == selectedWrongAnswer.text)){
          return answer
        }else{
          return {
            text: null,
            correct: false,
          }
        }
      })

      setUsedLifelines({
        ...usedLifeLines,
        fiftyFifty : true
      })

      setFilteredAnswers(lifeline_5050_answers)
      return lifeline_5050_answers
    }


    if(lifeline.phoneAFriend && !usedLifeLines.phoneAFriend){
      setUsedLifelines({
        ...usedLifeLines,
        phoneAFriend : true
      })


      let options = lifeline.fiftyFifty ? filteredAnswers.map((answer, index)=>{
        // check if this is a filtered answer and map the index of the filtered
        // answers to a, b, c, d options
        if(answer.text){
         return index === 0 ? 'a' :  index === 1 ? 'b' : index === 2 ? 'c' : 'd'
        }else{
          return null
        }
      }).filter(v => v!==null)
      :  ["a", "b", "c", "d"]
     

      const randomOption = Math.floor(Math.random() * options.length);

      setGuessedAnswer(options[randomOption])
      return filteredAnswers;
    }
    
    setFilteredAnswers(answers)
    return answers;

  },[Question, lifeline.phoneAFriend, lifeline.fiftyFifty])


  useEffect(()=>{
    if(!timerRunning && !phoneTimeOut){
      setShowModal(true)
    }else if(phoneTimeOut){
      setTimerRunning(true)
      setShowModal(false)
    }
  }, [phoneTimeOut,timerRunning])

  // to run the play
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);


  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer) => {
    setTimerRunning(false);
    setSelectedAnswer(answer);
    setActiveButtons(false);
    setClassName("answer active");
    

    delay(3000, () => {
      setClassName(answer.correct ? "answer correct" : "answer wrong");
    });


    delay(5000, () => {
      if (answer.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
          setTimerRunning(true);
          setActiveButtons(true)
        });
      } else {
        wrongAnswer();
        setActiveButtons(true)
        
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };
  const favour = () => {
    setFriends(false)
    setSelectedFriend("Favour")
    setSelectedAvatar("favourImg")
  }
  const phantom = () => {
    setFriends(false)
    setSelectedFriend("Phantom")
    setSelectedAvatar("phantomImg")

  }
  const sage = () => {
    setFriends(false)
    setSelectedFriend("Sage")
    setSelectedAvatar("sageImg")

  }




  return (
    <div className="h-full flex items-center flex-col justify-around -mt-10 md:-mt-0">
              <div>
            {showModal ? (
            <>
                <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative justify-center items-center  flex flex-col gap-2 w-[100vw] my-6 max-w-3xl">
                        {/*content*/}
                        <div className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center">
                        <PhoneTimer absolute left-10 top-28
                          setPhoneTimeOut={setPhoneTimeOut}
                          questionNumber={questionNumber}
                          phoneTimerRunning={phoneTimerRunning}
                          setPhoneTimerRunning={setPhoneTimerRunning}
                        />
                      </div>
                        <div className="border-0 w-2/3 p-4 rounded-lg  shadow-lg relative  flex flex-col lg:flex-row md:flex-row justify-center gap-3 bg-primary outline-none focus:outline-none">
                        
                        {friends ? (
                          <>
                            <div className="p-3 rounded-lg cursor-pointer bg-[#222] flex items-center justify-start flex-row gap-2" onClick={favour}>
                              <div>
                                <img src={favourImg || "https://res.cloudinary.com/phantom1245/image/upload/v1672750801/favour_irgcbi.png"} alt="" className="rounded-full w-[4rem]"/>
                              </div>
                              <div className="font-bold">Favour</div>
                            </div>
                            <div className="p-3 rounded-lg cursor-pointer bg-[#222] flex items-center justify-start flex-row gap-2" onClick={phantom}>
                              <div>
                                <img src={phantomImg || "https://res.cloudinary.com/phantom1245/image/upload/v1672750801/phantom_agpsb3.png"} alt="" className="rounded-full w-[4rem]"/>
                              </div>
                              <div className="font-bold">Phantom</div>
                            </div>
                            <div className="p-3 rounded-lg cursor-pointer bg-[#222] flex items-center justify-start flex-row gap-2" onClick={sage}>
                              <div>
                                <img src={sageImg || "https://res.cloudinary.com/phantom1245/image/upload/v1672750799/sage_psjzve.png"} alt="" className="rounded-full w-[4rem]"/>
                              </div>
                              <div className="font-bold">Sage</div>
                            </div>
                          </>
                        ) : (
                          <div>
                            {calling ? (
                              <>
                                <div>dialing...</div>
                              </>
                            ) : (
                              <div>
                                <div>
                                  <div className="bg-[#272727] p-2 rounded flex items-center justify-start flex-row gap-2">
                                  <div>
                                    <img src={frankImg} alt="" className="rounded-full w-[4rem]"/>
                                  </div>
                                  <div>Hello {selectedFriend} please what is the answer to {Question.question}</div>
                                  </div>
                                  <div>{loading ? (
                                    <div>...</div>
                                  ):(
                                    <div>
                                      <div className="text-green-500 p-3">i think the answer is <span className="cap">{guessedAnswer}</span></div>
                                    </div>
                                  )}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}

        </div>
      <div className="w-[80%] text-center p-4 rounded-md border-4 capitalize border-white bg-[#020230] ">
        {Question?.question}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-5 md:gap-y-10 my-5 gap-x-5 container capitalize">
        {Answers.map((answer, index) => (
          <button
            onClick={() => handleClick(answer)}
            key={index}
            disabled={!activeButtons}
            className={
              selectedAnswer === answer ? className  : "answer capitalize" 
            }
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Trivia;                       