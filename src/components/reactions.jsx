import { motion } from "framer-motion";


function Reaction({emojis, showEmotes}) {
    
    
    return(
        <div className='reaction-box'>

        {showEmotes && emojis.map((emotes) => {
          return(

            <motion.div
                key={emotes.id}
                style={{fontSize: `${Math.floor(Math.random() * 24) + 32}px`}}
                initial={{ x: `${Math.floor(Math.random() * 300)}px`,opacity: 1 }}
                animate={{ y: `450px`, opacity: 0 }}
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