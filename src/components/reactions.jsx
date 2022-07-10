import { motion } from "framer-motion";


function Reaction({emojis, showEmotes}) {
    


    
    return(
        <div className="reaction-box">
            {/* slap a rain cloud or something above this */}
            {emojis.map((emoji) => {

                return (
                    <motion.div
                        style={{fontSize: `${(Math.random() * 30) + 18}px`}}
                        initial={{ opacity: 1 }}
                        animate={{ y: `${(Math.random() * 120) + 120}px`, opacity: 0 }}
                        transition={{
                            repeat: `${Math.floor(Math.random() * 2) + 2}`, 
                            duration: `${(Math.random() * 2) + 1}`,
                            ease: "easeInOut",
                        }}
                    >{emoji}</motion.div>
                );
                
            })}
        </div>
    );
}

export default Reaction;