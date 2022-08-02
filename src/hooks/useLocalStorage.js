import { useState, useEffect } from 'react'

function getLocalStorage () {
    const oldData = JSON.parse(window.localStorage.getItem("OLD_SCORE"));
    if (oldData) {
        return oldData;
    } else {
        return ({currentTime: "00:00:00", currentCash: 0});
    }
}

export default function useLocalStorage (newStats) {
    const [newScore, setNewScore] = useState({currentTime: newStats.currentTime, currentCash: newStats.currentCash})
    const [bestScore, setBestScore] = useState(()=>{return getLocalStorage()});
    

    // compare
    useEffect(()=>{
        const newTimeInt = newScore.currentTime.split(":");
        const oldTimeInt = bestScore.currentTime.split(":");
        // if newTime's hour is greater than the previous one then...
        if (parseInt(newTimeInt[0]) > parseInt(oldTimeInt[0])) {
            window.localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newScore.currentTime,
                currentCash: newScore.currentCash
            })) 
            setBestScore({currentTime: newScore.currentTime, currentCash: newScore.currentCash});
            // setBestScore({currentTime: newTime, currentCash: newCash});
        // if newTime's minutes is greater than the previous one then...
        } else if (parseInt(newTimeInt[1]) > parseInt(oldTimeInt[1])) {

            window.localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newScore.currentTime,
                currentCash: newScore.currentCash
            }))
            setBestScore({currentTime: newScore.currentTime, currentCash: newScore.currentCash});
            // setBestScore({currentTime: newTime, currentCash: newCash});
        // if newTime's seconds is greater than the previous one then...    
        } else if (parseInt(newTimeInt[2]) > parseInt(oldTimeInt[2])) {
            window.localStorage.setItem("OLD_SCORE", JSON.stringify({
                currentTime: newScore.currentTime,
                currentCash: newScore.currentCash
            }))
            setBestScore({currentTime: newScore.currentTime, currentCash: newScore.currentCash});
        } 
    },[newScore]);

    // returns the value from localStorage
    return [bestScore, setNewScore]
}

