import { useState, useEffect } from "react";

function Timer({updateTime}) {
    const [time, setTime] = useState(0);

    useEffect(()=>{
        setTimeout(() => {
            setTime(prevTime => prevTime + 1);
            updateTime(time);
        }, 1000);
    },[time])

    return(
        <div>Time Lasted: {time}</div>
    );
}

export default Timer;