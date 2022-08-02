import { useState, useEffect } from 'react'

function getLocalStorage () {
    const oldData = JSON.parse(localStorage.getItem("OLD_SCORE"));

    if (oldData) {
        return oldData;
    } else {
        return ({currentTime: "00:00:00", currentCash: -1});
    }
}

export default function useLocalStorage (newTime, newCash) {
    const [bestScore, setBestScore] = useState(()=>{return getLocalStorage()});
    
    useEffect(()=>{
        let newTimeInt = newTime.split(":");
        let oldTimeInt = bestScore.currentTime.split(":");
        // if newTime's hour is greater than the previous one then...
        if (parseInt(newTimeInt[0]) > parseInt(oldTimeInt[0])) {
            localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newTime,
                currentCash: newCash
            }))
        // if newTime's minutes is greater than the previous one then...
        } else if (parseInt(newTimeInt[0]) > parseInt(oldTimeInt[0])) {
            localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newTime,
                currentCash: newCash
            }))
        // if newTime's seconds is greater than the previous one then...    
        } else if (parseInt(newTimeInt[0]) > parseInt(oldTimeInt[0])) {
            localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newTime,
                currentCash: newCash
            }))
        }
    },[bestScore]);

    // returns the value from localStorage
    return [bestScore, setBestScore]
}

