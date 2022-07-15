// import { useState } from "react";
import { motion } from 'framer-motion'

export default function PerkOptions({btnType, updatePerks}) {



    return(
        <>
            {/* Perk Options */}
            {btnType === "getCash" && 
                <motion.button 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("money")}
                    className="perkBtn getCash"
                >💰</motion.button>
            }
            {btnType === "getAffection" && 
                <motion.button 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("affection")}
                    className="perkBtn getAffection"
                >😳</motion.button>
            }
            {/* Cash Perks */}
            {btnType === "workAtAMC" && 
                <motion.button 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks()}
                    className="perkBtn workAtAMC"
                >Work at AMC 30</motion.button>
            }
            {btnType === "gamble" && 
                <motion.button 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("options")}
                    className="perkBtn gamble"
                >Gamble</motion.button>
            }
            {/* Affection Perks */}
            {/* {btnType === "bike" && 
                <motion.button 
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                    onClick={() => updatePerks("bike")}
                    className="perkBtn bike"
                >🚲</motion.button>
            } */}
        </>
    );
}