import { useState, useEffect } from "react";
import useCounter from './useCounter';


export default function usePerkStatus (price, number, timer, lifeSpan) {
    const [disabled, setDisabled] = useState(false);
    const [cost, setCost] = useState(price);
    const [quantity, setQuantity] = useState(number); 
    const [shouldUpdate, setShouldUpdate] = useState("");
    // currently hard set to only work for the workAMC time btw
    const [time, updateTime] = useCounter(102, timer, "decrement", 1);

    useEffect(()=>{
        if(shouldUpdate !== "") {
            setDisabled(true);
            if (shouldUpdate === "gamble" || shouldUpdate === "viola") {
                setCost(prevCost => prevCost * 2);
            } else if (shouldUpdate === "plushie") {
                setCost(prevCost => prevCost + 10);
            } else if (shouldUpdate === "bike") {
                setCost(prevCost => prevCost + 30);
            }
            updateTime(102)
            setShouldUpdate("nope");
            setTimeout(()=> {
                setDisabled(false);
                updateTime(0)
            }, lifeSpan);

        } 
    },[shouldUpdate])


    return [disabled, cost, setShouldUpdate, time, quantity, setQuantity];
}