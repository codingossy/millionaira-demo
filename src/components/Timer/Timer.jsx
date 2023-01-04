import React, { useEffect, useState } from "react";

const Timer = ({
  setTimeOut,
  questionNumber,
  timerRunning,
  setTimerRunning,
}) => {
  // starting at 15 so it counts down
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);

    if (timerRunning) {
      const interval = setInterval(() => {
        setTimer((previous) => previous - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    // return () => clearInterval(interval);

    // set timer and settimeout as deps so they run jus once
  }, [timer, setTimeOut, timerRunning]);

  useEffect(() => {
    setTimer(15);
  }, [questionNumber]);

  return timer;
};

export default Timer;
