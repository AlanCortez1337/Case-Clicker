// import { useState } from "react";
import StatusBar from './statusBar';
import { AnimatePresence, motion } from 'framer-motion'

export default function PerkOptions({btnType, updatePerks, cost, disabled, backgroundColor, timer}) {

    const disabledButtonTransistion = {
        ease: "easeInOut",
        repeat: "Infinite",
        duration: 0.25
    }

    return(
        <AnimatePresence>
            {/* Perk Options */}
            {!disabled ? 
            <div className='perk-button'>
                <motion.button 
                    initial={{rotate: 0, backgroundColor: backgroundColor}}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("money")}
                    className="perk-content"
                >
                    {cost > 0 && <span className="top-perk-info">cost: ${cost}</span>}
                    <span className="perk-title">{btnType}</span>
                    <div className="bottom-perk-info">
                        <span>xNumber</span>
                        {/* animate and reveal a small blurp about button */}
                        <span>Info</span>
                    </div>
                </motion.button>
                <StatusBar key={`${btnType}-off`} currentProgress={0} width="250px" height="20px" startPoint="0%"/>
            </div>

                :
                <div className='perk-button'>
                    <motion.button 
                        initial={{rotate: 0, backgroundColor: backgroundColor}}
                        whileHover={{scale: 1.05}}
                        whileTap={{rotate: [0, 10, -10, 0], backgroundColor: "#EF2D56"}}
                        transition={disabledButtonTransistion}
                        className="perk-content"
                    >
                        {cost > 0 && <span className="top-perk-info">cost: ${cost}</span>}
                        <span className="perk-title">{btnType}</span>
                        <div className="bottom-perk-info">
                            <span>xNumber</span>
                            {/* animate and reveal a small blurp about button */}
                            <span>Info</span>
                        </div>
                    </motion.button>
                    <StatusBar key={`${btnType}-on`} currentProgress={timer} width="250px" height="20px" startPoint="100%"/>
                </div>
            }
        </AnimatePresence>
    );
}