import ProgressBar from './statusBar'
import Timer from './timer'

export default function Stats({affectionMeter, currentMoney, currentLives}) {
    
    return(
        <section className='stat-block-bg'>
            <h1>CASE-O-STATS</h1>
            <div className='every-stat'>
                <h2 className='happy-meter'>
                    😄 <ProgressBar currentProgress={affectionMeter} width="400px" height="30px" startPoint="0%" variant={true}/>
                </h2>
                <h2 className='money-meter'>💰 ${currentMoney}</h2>
                <h2 className='life-meter'>❤️x {currentLives}</h2>
                <Timer/>
            </div>
        </section>
    );
    
}