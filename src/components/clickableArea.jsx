import Reaction from './reactions'
import { motion } from "framer-motion";
import Icon from '../favicon.svg'

export default function ClickableArea({reactions, updateAffection}) {
    return (
        <div onClick={updateAffection} className="clickable-area">
            <motion.img 
            whileTap={{ scale: 0.9 }}
            
            src={Icon} alt="clickable area" />
            <Reaction emojis={reactions}/>

        </div>
    );
}