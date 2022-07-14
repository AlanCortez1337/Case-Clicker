import Reaction from './reactions'
import { motion } from "framer-motion";
import Icon from '../favicon.svg'

export default function ClickableArea({reactions, updateAffection}) {
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
            <Reaction emojis={reactions}/>

        </div>
    );
}