import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reaction from './reactions'
import Icon from '../favicon.svg'

export default function ClickableArea({currentAffection, updateAffection}) {
    const [currentEmotion, setCurrentEmotion] = useState([]);
    // adding new emojis to display based on the meter
    useEffect(()=>{
        if (currentAffection === 10) {
          setCurrentEmotion([...currentEmotion,
            {emote: "😈", id: Math.random()}, 
            {emote: "😈", id: Math.random()}, 
            {emote: "😈", id: Math.random()}
          ]);
        } else if (currentAffection === 25) {
          setCurrentEmotion([...currentEmotion,
            {emote: "😡", id: Math.random()}, 
            {emote: "😡", id: Math.random()}, 
            {emote: "😡", id: Math.random()} 
          ]);
          
        } else if (currentAffection === 50) {
          setCurrentEmotion([...currentEmotion,
            {emote: "😔", id: Math.random()}, 
            {emote: "😔", id: Math.random()}, 
            {emote: "😔", id: Math.random()}
          ]);
        } else if (currentAffection === 75) {
          setCurrentEmotion([...currentEmotion,
            {emote: "😐", id: Math.random()}, 
            {emote: "😐", id: Math.random()}, 
            {emote: "😐", id: Math.random()}
          ]);
        } 
    }, [currentAffection]);
    // purging the old emojis to not cause performance issues
    useEffect(()=> {
        if (currentEmotion.length >= 10) {
            setCurrentEmotion([...currentEmotion.slice(0, 1),
            ...currentEmotion.slice(2, currentEmotion.length)]);
        }
    }, [currentEmotion])   
    

    const rotateTransition = {
        ease: "easeInOut",
        duration: 2.5,
        repeat: "Infinity",
        repeatType: "mirror"
    };

    return (
        <div onClick={updateAffection} className="clickable-area">
            <motion.img 
            initial={{rotate: 0}}
            animate={{rotate: [-25, 25]}}
            whileTap={{ scale: 0.9 }}
            transition={rotateTransition}
            src={Icon} alt="clickable area" />
            <Reaction emojis={currentEmotion}/>
        </div>
    );
}