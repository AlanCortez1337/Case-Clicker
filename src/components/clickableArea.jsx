import { motion } from "framer-motion";
import Icon from '/case.webp'

export default function ClickableArea({updateAffection}) {

    const rotateTransition = {
        ease: "easeInOut",
        duration: 2.5,
        repeat: "Infinity",
        repeatType: "mirror"
    };

    return (
        <div  className="clickable-area">
            <motion.img 
                initial={{rotate: 0}}
                animate={{rotate: [-25, 25], transition: rotateTransition}}
                whileTap={{scale: 0.98}}
                src={Icon} alt="clickable area" 
                width={"400px"}
                height={"400px"}
                onClick={updateAffection}
            />
        </div>
    );
}