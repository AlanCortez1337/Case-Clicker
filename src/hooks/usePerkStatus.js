import { useState, useEffect } from "react";

export default function usePerkStatus (price) {
    const [disabled, setDisabled] = useState(false);
    const [cost, setCost] = useState(price);
    const [quantity, setQuantity] = useState(0); 
    const [shouldUpdate, setShouldUpdate] = useState("");

    useEffect(()=>{
        if(shouldUpdate === "gamble") {
            setDisabled(true);
            setCost(prevCost => prevCost * 2);
            setTimeout(()=> {
                setDisabled(false);
                setShouldUpdate("nope");
            }, 5000 );

        }
    },[shouldUpdate])


    return [disabled, cost, quantity, setShouldUpdate];
}