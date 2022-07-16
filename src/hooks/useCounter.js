import { useState, useEffect } from "react";

export default function useCounter (time, timeInterval, counterType, modifier) {
    const [currentTime, setCurrentTime] = useState(time);
    const [mod, setMod] = useState(modifier);
    const [interaction, setInteraction] = useState("timer");

    useEffect(()=>{
        if(interaction === "timer") {
            if(counterType === "increment"){
                    setTimeout(() => {
                        setCurrentTime(prevTime => prevTime + mod);
                        setInteraction("timer");
                    }, timeInterval);
            } else if (counterType === "decrement") {
                if(currentTime > 0) {
                    setTimeout(() => {
                        setCurrentTime(prevTime => prevTime - mod);
                        setInteraction("timer");
                    }, timeInterval);
                }
            }
        }
    }, [currentTime]);

    return [currentTime, setCurrentTime, setInteraction, setMod];
}