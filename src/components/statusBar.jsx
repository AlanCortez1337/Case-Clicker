import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatusBar ({currentProgress}) {
    const [statusColor, setStatusColor] = useState("#2FBF71");

    useEffect(()=>{
        if (currentProgress > 80) {
            setStatusColor("#2FBF71");
        } else if (currentProgress > 60) {
            setStatusColor("#F3CA40");
        } else if (currentProgress > 40) {
            setStatusColor("#F2A541");
        } else if (currentProgress > 20) {
            setStatusColor("#F08A4B");
        } else {
            setStatusColor("#EF2D56");
        }
    },[currentProgress])

    const progressTransition = {
        ease: "easeInOut", 
        type: "spring",
        bounce: 0
        // , damping: 8
    };

    return (
        <div className="progress-bar">
            {/* animati */}
            <motion.span
                style={{width: `55%`}}
                initial={{width: '0%'}}
                animate={{width: `${currentProgress}%`, backgroundColor: statusColor}}
                transition={progressTransition}
                className="current-progress"
            ></motion.span>
        </div>
    );
}