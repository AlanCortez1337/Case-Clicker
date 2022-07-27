import { useState, useEffect } from "react";
import useCounter from './useCounter';


export default function usePerkStatus (price, timer, lifeSpan) {
    const [disabled, setDisabled] = useState(false);
    const [cost, setCost] = useState(price);
    const [shouldUpdate, setShouldUpdate] = useState("");
    // currently hard set to only work for the workAMC time btw
    const [setTimerOff, time, updateTime] = useCounter(false, 102, timer, "decrement", 1);

    useEffect(()=>{
        if(shouldUpdate !== "") {
            setDisabled(true);
            if (shouldUpdate === "gamble" || shouldUpdate === "viola") {
                setCost(prevCost => prevCost * 2);
            } else if (shouldUpdate === "plushie") {
                setCost(prevCost => prevCost + 50);
            } else if (shouldUpdate === "bike") {
                setCost(prevCost => (2 * prevCost) + 30);
            }
            updateTime(102)
            setShouldUpdate("restart time");
            // how long until it should become undisabled
            setTimeout(()=> {
                setDisabled(false);
                updateTime(0)
            }, lifeSpan);

        } 
    },[shouldUpdate])


    return [disabled, cost, setShouldUpdate, time];
}