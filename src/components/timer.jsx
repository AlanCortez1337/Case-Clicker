import { useEffect, useState } from 'react';
import Counter from '../hooks/useCounter'

function Timer({pauseTime, sendTime}) {
    const [setTimerOff, time] = Counter(true, 0, 1000, "increment", 1);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(-1);
    const [specialEncounter, setSpecialEncounter] = useState(false);
    const [currentTime, setCurrentTime] = useState("00:00:00");



    useEffect(()=>{
        if(!specialEncounter) {
            if (hours === 59) {
                setSpecialEncounter(true);
            } else if (minutes === 59) {
                setHours(prev => prev + 1);
                setMinutes(0);
                setSeconds(0);
    
            } else if(seconds === 59){
                setMinutes(prev => prev + 1);
                setSeconds(0);
            } else {
            setSeconds(prev => prev + 1)
            }
            // convert into a readable string to tell the time
            setCurrentTime(`${hours > 9 ? `${hours}` : `0${hours}`}:${minutes > 9 ? `${minutes}` : `0${minutes}`}:${seconds > 9 ? `${seconds}` : `${seconds === -1 ? "00" : `0${seconds}`}`}`)
        }
    }
    ,[time])

    useEffect(()=>{
            if(pauseTime) {
                setTimerOff(true);
                sendTime(currentTime);
            }else{
                setTimerOff(false);
                setCurrentTime("00:00:00");
                setSeconds(0);
                setMinutes(0);
                setHours(0);
                sendTime(currentTime);
        }
    },[pauseTime])

    return(
        <>
            {specialEncounter ? 
                <h2>bro wtf...</h2>
                :
                <h2 className='timer time-meter'> <span className='emoji'>⏳</span>
                    {currentTime}
                </h2>
            }
        </>
    );
}

export default Timer;