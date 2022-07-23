import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatusBar ({currentProgress, width, height, startPoint, variant}) {
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
        <div className={variant ? "progress-bar-variant" : "progress-bar"} style={{height: height, width: width}}>
            {/* animati */} 
            {!isNaN(currentProgress) && 
                <motion.span
                    style={{width: ``, height: ""}}
                    initial={{width: startPoint}}
                    animate={{width: `${currentProgress}%`, backgroundColor: statusColor}}
                    transition={progressTransition}
                    className={variant ? "current-progress-variant" : "current-progress"}
                ></motion.span>
            }
        </div>
    );
}