import { motion} from 'framer-motion'
import Backdrop from './backdrop'

export default function Modal ({handleClose, modalType, time, money}) {

    const modalVariant = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 5,
                type: "spring",
                damping: 100,
                stiffness: 500
            }
        },
        exit: {
            y: "-100vh",
            opacity: 0
        }
    }


    return (
        
            <Backdrop>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="modal no-highlight"
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {modalType === "intro" ?
                        <>
                            <h1>Welcome to Case Clicker!</h1>
                            <p>
                                Game is simple, don't let the happiness meter 
                                at the bottom left doesn't hit zero. Tap on Case 
                                to make him happy or buy perks on the right hand 
                                side to help you on your journey! Try to last and 
                                make Case happy or else... SO WHAT ARE WAITING FOR? 
                                GO MAKE A MAN HAPPY!
                            </p>
                            <motion.button 
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                onClick={handleClose}
                            >
                                Let's Rock n Roll
                            </motion.button>
                        </>
                        :
                        <>
                            <h1>Game Over!</h1>
                            <h2>Your Stats</h2>
                            <div className='modal-stats'>
                                <p>Time Survived: {time}</p>
                                <p>Remaining Money: ${money}</p>
                            </div>
                            <p className='subtext'>Remember to share with Alan!</p>
                            <motion.button 
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                onClick={handleClose}
                            >
                                Try Again?
                            </motion.button>
                        </>
                    }
                </motion.div>
            </Backdrop>
    );

}