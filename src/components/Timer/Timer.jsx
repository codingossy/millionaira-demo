import React, { useEffect, useState } from 'react'

const Timer = ({ setTimeOut, questionNumber } ) => {
    // starting at 30 so it counts down 
    const [timer, setTimer] = useState(15);

    useEffect(() => {
        if (timer === 0 ) return setTimeOut(true)

        const interval = setInterval(() =>  {
            setTimer((previous) => previous - 1)
        }, 1000)
        return () => clearInterval(interval)

        // set timer and settimeout as deps so they run jus once 
    }, [timer, setTimeOut])

    useEffect(() => {
        setTimer(15)
    }, [questionNumber])


  return  timer
}

export default Timer