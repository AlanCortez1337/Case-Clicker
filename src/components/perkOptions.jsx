// import { useState } from "react";
import StatusBar from './statusBar';
import { motion } from 'framer-motion'

export default function PerkOptions({btnType, updatePerks, cost, disabled, backgroundColor, timer}) {

    const disabledButtonTransistion = {
        ease: "easeInOut",
        repeat: "Infinite",
        duration: 0.25
    }

    return(
        <>
            {/* Perk Options */}
            {!disabled ? 
                <motion.button 
                    initial={{rotate: 0, backgroundColor: backgroundColor}}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("money")}
                    className="perkBtn"
                >
                    {btnType}
                    {cost !== -1 &&  <span>cost: ${cost}</span>}
                    <span>more info...</span>
                </motion.button>
                :
                <>
                    <motion.button 
                        whileHover={{scale: 1.05}}
                        whileTap={{rotate: [0, 10, -10, 0], backgroundColor: "#EF2D56"}}
                        transition={disabledButtonTransistion}
                        className="perkBtn"
                    >
                        {btnType}
                        {cost !== -1 &&  <span>cost: ${cost}</span>}
                        <span>more info...</span>
                    </motion.button>
                    <StatusBar currentProgress={timer}/>
                </>
            }
        </>
    );
}