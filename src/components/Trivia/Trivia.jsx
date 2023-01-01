import React, { useEffect, useState, useMemo } from "react";
import useSound from "use-sound";
import play from "../../assets/sounds/play.mp3";
import correct from "../../assets/sounds/correct.mp3";
import wrong from "../../assets/sounds/wrong.mp3";

const initial_lifelines = {
  fiftyFifty: false,
  phoneAFriend: false,
  askAudience: false,
}

const Trivia = ({
  data,
  questionNumber,
  setTimerRunning,
  setQuestionNumber,
  setTimeOut,
  lifeline
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
    console.log(answers)
    if(lifeline.fiftyFifty && !usedLifeLines.fiftyFifty){
  
      // filter out all the wrong answers
     const wrongAnswers = answers.filter(answer=> !answer.correct);
    

     // generate random number to match index of all wrongAnswers
     const randomNumber = Math.floor(Math.random() * wrongAnswers.length);

     // find the selected wrongAnswer with the gen. random number
     const selectedWrongAnswer = wrongAnswers[randomNumber];


     const lifeline_5050_answers = answers.map((answer, index, arr)=>{
      // if answer is correct or answer matches the 
      // random number selected wrong answer, return that answer
      // otherwise, return answer with empty text
        if(answer.correct || (answer.text == selectedWrongAnswer.text)){
          return answer
        }else{
          return {
            text: ' ',
            correct: false,
          }
        }
      })
      setUsedLifelines({
        ...usedLifeLines,
        fiftyFifty : true
      })
      return lifeline_5050_answers
    }
    return answers
  },[Question, lifeline])

  // to run the play
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  //      fetching the questions data
  // useEffect(() => {
  //   const randomNumber = Math.floor(Math.random() * data.length);
  //   setQuestion(data[randomNumber]);
  // }, [data, questionNumber]);

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
  return (
    <div className="h-full flex items-center flex-col justify-around -mt-10 md:-mt-0">
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
