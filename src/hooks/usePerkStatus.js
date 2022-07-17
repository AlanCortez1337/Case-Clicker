import { useState, useEffect } from "react";
import useCounter from './useCounter';


export default function usePerkStatus (price) {
    const [disabled, setDisabled] = useState(false);
    const [cost, setCost] = useState(price);
    const [quantity, setQuantity] = useState(0); 
    const [shouldUpdate, setShouldUpdate] = useState("");
    // currently hard set to only work for the workAMC time btw
    const [time, updateTime] = useCounter(102, 32, "decrement", 1);

    useEffect(()=>{
        if(shouldUpdate === "workPerk") {
            setDisabled(true);
            setCost(prevCost => prevCost * 2);
            updateTime(102)
            setTimeout(()=> {
                setDisabled(false);
                setShouldUpdate("nope");
                updateTime(0)
            }, 5000 );

        }
    },[shouldUpdate])


    return [disabled, cost, quantity, setShouldUpdate, time];
}