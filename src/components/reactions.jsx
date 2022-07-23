import { motion } from "framer-motion";


function Reaction({emojis}) {
    
    
    return(
        <div className='reaction-box'>

        { emojis.map((emotes) => {
          return(

            <motion.div
                key={emotes.id}
                style={{fontSize: `48px`}}
                initial={{ y: `${Math.floor(Math.random() * 300) + 250}px`, x: `${Math.floor(Math.random() * 300) - 200}px`,opacity: 1 }}
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