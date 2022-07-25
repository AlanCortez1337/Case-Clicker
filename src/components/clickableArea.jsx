import { motion } from "framer-motion";
import Icon from '../favicon.svg'

export default function ClickableArea({updateAffection}) {

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
            transition={rotateTransition}
            src={Icon} alt="clickable area" />
        </div>
    );
}