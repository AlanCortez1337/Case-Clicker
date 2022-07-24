import { motion } from "framer-motion";


function Reaction({emojis, variant}) {
    
    
    return(
        <div className={`reaction-box${variant}`}>

        { emojis.map((emotes) => {
          return(

            <motion.div
                key={emotes.id}
                style={{fontSize: `48px`}}
                initial={{ y: `${Math.floor(Math.random() * 300) + 150}px`, x: `${Math.floor(Math.random() * 300) + 50}px`,opacity: 1 }}
                animate={{ y: `0px`, opacity: 0 }}
                transition={{
                    repeat: '0',
                    duration: `1`,
                    ease: "easeInOut",
                }}
            >{emotes.emote}</motion.div>
          );
        })
        }
      </div>
    );
}

export default Reaction;