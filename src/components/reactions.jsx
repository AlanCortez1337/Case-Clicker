import { motion } from "framer-motion";

function Reaction({emojis, variant}) {
    const screenWidth = window.innerWidth;
    
    return(
        <div className={`reaction-box${variant}`}>

        { emojis.map((emotes) => {
          return(

            <motion.div
                key={emotes.id}
                style={{fontSize: `48px`}}
                initial={{ 
                  y: `${Math.floor(Math.random() * 300) + 150}px`, 
                  x: `${screenWidth <= 700 ? `${Math.floor(Math.random() * 55) + 15}vw` : `${Math.floor(Math.random() * 15) + 5}vw`}`,
                  opacity: 1 
                }}
                animate={{ y: `0px`, opacity: 0 }}
                transition={{
                    repeat: '0',
                    duration: `1`,
                    ease: "easeInOut",
                }}
                className="no-highlight"
            >{emotes.emote}</motion.div>
          );
        })
        }
      </div>
    );
}

export default Reaction;