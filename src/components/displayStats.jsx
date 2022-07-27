import { useState, useEffect } from 'react';
import ProgressBar from './statusBar'
import Timer from './timer'

export default function Stats({affectionMeter, currentMoney, currentLives, startTimer, passTime}) {
    const [currentEmotion, setCurrentEmotion] = useState("😐");
    useEffect(()=>{
        if (affectionMeter > 90) {
            setCurrentEmotion("😳");
        } else if (affectionMeter > 80) {
            setCurrentEmotion("😄");
        } else if (affectionMeter > 60) {
            setCurrentEmotion("😐");
        } else if (affectionMeter > 40) {
            setCurrentEmotion("😔");
        } else if (affectionMeter > 20) {
            setCurrentEmotion("😡");
        } else if (affectionMeter > 1) {
            setCurrentEmotion("😈");
        }
    }, [affectionMeter])

    return(
        <section className='stat-block-bg'>
            <h1>CASE-O-STATS</h1>
            <div className='every-stat'>
                <h2 className='happy-meter'>
                    <span className='emoji'>{currentEmotion}</span> <ProgressBar currentProgress={affectionMeter} width="400px" height="30px" startPoint="0%" variant={true}/>
                </h2>
                <h2 className='money-meter'><span className='emoji'>💰</span> ${currentMoney}</h2>
                <h2 className='life-meter'><span className='emoji'>❤️</span>x {currentLives}</h2>
                <Timer pauseTime={startTimer} sendTime={(time) => passTime(time)}/>
            </div>
        </section>
    );
    
}