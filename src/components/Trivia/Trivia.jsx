import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../../assets/sounds/play.mp3";
import correct from "../../assets/sounds/correct.mp3";
import wrong from "../../assets/sounds/wrong.mp3";

const Trivia = ({
  data,
  questionNumber,
  setTimerRunning,
  setQuestionNumber,
  setTimeOut
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // to run the play
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  //      fetching the questions data
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setTimerRunning(false);
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
          setTimerRunning(true);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };

  return (
    <div className="h-full flex items-center flex-col justify-around -mt-10 md:-mt-0">
      <div className="w-[80%] text-center p-4 rounded-md border-4 capitalize border-white bg-[#020230] ">
        {question?.question}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-5 md:gap-y-10 my-5 gap-x-5 container capitalize">
        {question?.answers.map((a, i) => (
          <div
            onClick={() => handleClick(a)}
            key={i}
            className={
              selectedAnswer === a
                ? className 
                : "answer capitalize"
            }
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
