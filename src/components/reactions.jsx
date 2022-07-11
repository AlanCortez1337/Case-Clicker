import { motion } from "framer-motion";


function Reaction({emojis, showEmotes}) {
    
    // const controls = useAnimation();
    
    
    return(
        
        <div className="reaction-box">
                {/* {showEmotes &&
                    <motion.div
                        animate={controls}
                    >
                        {emojis}
                    </motion.div>
                } */}


                {/* {showEmotes && emojis.map((emoji) => {
                    return (
                        <motion.di
                            key={Math.random() * 10}
                            // style={{fontSize: `${(Math.random() * 30) + 18}px`}}
                            // initial={{ opacity: 1 }}
                            // animate={{ y: `${(Math.random() * 120) + 120}px`, opacity: 0 }}
                            // transition={{
                            //     repeat: '0',
                            //     duration: `${(Math.random() * 2) + 1}`,
                            //     ease: "easeInOut",
                            // }}
                            style={{fontSize: `28px`}}
                            initial={{ opacity: 1 }}
                            animate={{ y: `450px`, opacity: 0 }}
                            transition={{
                                repeat: '0',
                                duration: `1`,
                                ease: "easeInOut",
                            }}

                        >{emoji}</motion.div>
                    );
                    
                })} */}
        </div>
    );
}

export default Reaction;