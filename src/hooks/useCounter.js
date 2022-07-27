import { useState, useEffect } from "react";

export default function useCounter (onOff, time, timeInterval, counterType, modifier) {
    const [currentTime, setCurrentTime] = useState(time);
    const [mod, setMod] = useState(modifier);
    const [interaction, setInteraction] = useState("timer");
    const [pause, setPause] = useState(onOff);

    useEffect(()=>{
        if(interaction === "timer" && !pause) {
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
    }, [currentTime, pause]);

    return [setPause, currentTime, setCurrentTime, setInteraction, setMod, mod];
}