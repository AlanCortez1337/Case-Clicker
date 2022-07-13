import { motion } from "framer-motion";


function Reaction({emojis, showEmotes}) {
    
    
    return(
        <div className='reaction-box'>

        { emojis.map((emotes) => {
          return(

            <motion.div
                key={emotes.id}
                style={{fontSize: `48px`}}
                initial={{ y: `450px`, x: `${Math.floor(Math.random() * 300)}px`,opacity: 1 }}
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