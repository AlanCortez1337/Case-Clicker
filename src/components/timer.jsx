import { useEffect, useState } from 'react';
import Counter from '../hooks/useCounter'

function Timer() {
    const [time] = Counter(0, 1000, "increment", 1);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(-2);
    const [specialEncounter, setSpecialEncounter] = useState(false);

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
        }
    }
    ,[time])


    return(
        <>
            {specialEncounter ? 
                <h2>bro wtf...</h2>
                :
                <h2 className='timer time-meter'> ⏳
                    {hours > 9 ? <> {hours}</> : <> 0{hours}</>}:
                    {minutes > 9 ? <>{minutes}</> : <>0{minutes}</>}:
                    {seconds > 9 ? <>{seconds}</> : <>0{seconds}</>}
                </h2>
            }

        </>



    );
}

export default Timer;