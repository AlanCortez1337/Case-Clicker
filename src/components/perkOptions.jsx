// import { useState } from "react";
import StatusBar from './statusBar';
import { AnimatePresence, motion } from 'framer-motion'

export default function PerkOptions({btnType, updatePerks, cost, quantity, disabled, backgroundColor, timer}) {

    const handleUpdate = () => {
        if(!disabled || btnType === "Play with son") {
            updatePerks()
        }
    }

    return(
        <AnimatePresence>
            <div className='perk-button'>
                <motion.button 
                    initial={{rotate: 0, backgroundColor: backgroundColor}}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => handleUpdate()}
                    className="perk-content"
                ><span className="perk-title">{btnType}</span></motion.button>
                {!disabled ? 
                    <StatusBar key={`${btnType}-off`} currentProgress={0} width="250px" height="20px" startPoint="0%"/>
                    :
                    <StatusBar key={`${btnType}-on`} currentProgress={timer} width="250px" height="20px" startPoint="100%"/>
                }
                <span className="top-perk-info">Info</span>
                <div className="bottom-perk-info">
                        {quantity !== -1 && <span>x{quantity}</span>}
                        {/* animate and reveal a small blurp about button */}
                        {cost > 0 && <span>cost: ${cost}</span>}
                    </div>
            </div>
        </AnimatePresence>
    );
}