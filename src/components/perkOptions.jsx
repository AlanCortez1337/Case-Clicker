import { AnimatePresence, motion } from 'framer-motion'
import StatusBar from './statusBar';
import Gamble from '/gamble.webp'
import AMC from '/amc.webp'
import Plushie from '/amongus.webp'
import Bike from '/bike.webp'
import Viola from '/viola.webp'

export default function PerkOptions({btnName, updatePerks, cost, disabled, timer, info}) {

    const handleUpdate = () => {
        if(!disabled) {
            updatePerks()
        }
    }

    return(
        <AnimatePresence>
            <div className='perk-button'>
                <motion.button 
                    // initial={{rotate: 0}}
                    // whileHover={{scale: 1.05}}
                    // whileTap={{scale: 0.9}}
                    onClick={() => handleUpdate()}
                    className="perk-content"
                >
                    {/* Unique button image and title */}
                    {btnName === "AMC" ?
                        <div className='perk-container'>
                            <img src={AMC} alt="work at amc"/>
                            <h3>Work</h3>
                        </div>
                        :
                        <>
                            {btnName === "Gamble" ? 
                                <div className='perk-container'>
                                    <img src={Gamble} alt="gamble" />
                                    <h3>Gamble</h3>
                                </div>
                                :
                                <>
                                    {btnName === "Plushie" ? 
                                        <div className='perk-container'>
                                            <img src={Plushie} alt="play with plushie" />
                                            <h3>Son</h3>
                                        </div>
                                        :
                                        <>
                                            {btnName === "Bike" ? 
                                            <div className='perk-container'>
                                                <img src={Bike} alt="bike it off" /> 
                                                <h3>Bike</h3>
                                            </div>
                                                :
                                                <div className='perk-container'>
                                                    <img src={Viola} alt="Viola" />
                                                    <h3>Hang Out</h3>
                                                </div>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </>
                    } 
                </motion.button>
                {!disabled ? 
                    <StatusBar key={`${btnName}-off`} currentProgress={0} width="100%" height="10px" startPoint="0%" variant={false}/>
                    :
                    <StatusBar key={`${btnName}-on`} currentProgress={timer} width="100%" height="10px" startPoint="100%" variant={false}/>
                }


                <div className='perk-blurp'>
                    {cost !== -1 && <h3>Cost: ${cost}</h3>}
                    <p>{info}</p>
                </div>
            </div>
        </AnimatePresence>
    );
}