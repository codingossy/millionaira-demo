import React, { useEffect, useState } from "react";

const PhoneTimer = ({
  setPhoneTimeOut,
  questionNumber,
  phoneTimerRunning,
}) => {
  // starting at 15 so it counts down
  const [phoneTimer, setPhoneTimer] = useState(15);

  useEffect(() => {
    if (phoneTimer === 0) return setPhoneTimeOut(true);

    if (phoneTimerRunning) {
      const interval = setInterval(() => {
        setPhoneTimer((previous) => previous - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    // return () => clearInterval(interval);

    // set timer and settimeout as deps so they run jus once
  }, [phoneTimer, setPhoneTimeOut]);

  useEffect(() => {
    setPhoneTimer(15);
  }, [questionNumber]);

  return phoneTimer;
};

export default PhoneTimer;