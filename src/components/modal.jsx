import { motion} from 'framer-motion'
import Backdrop from './backdrop'

export default function Modal ({handleClose, modalType, time, money, oldStats}) {

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
                            <div className='modal-title'>
                                <h1>👋 Welcome 👋</h1>
                                <h2>✨ to ✨</h2>
                                <h1>😂 Case Clicker! 😂</h1>
                            </div>
                            <p>
                                Game 🎮 is simple 🙏, ❌don't let 🥶
                                the happy 😄 meter hit 😡 zero 😈. Tap on 😩 Case 😳  
                                to make him 🤝 happy 🤪 or buy 💸 perks 💰 to 🤜🤛 help 🤝 you 
                                on your 🌠 journey 🚀! Try to 😳 last 💦 a 📏 long ⏱️ time ⏳
                                and make Case 😂 happy 🤤 or else 🤫 someone will be 😥 sad 😭! 
                            </p>
                            <p>SO 🤔 WHAT ❓ ARE WAITING ⏲️ FOR? GO 🚶‍♂️💨MAKE A 😆 MAN...</p>
                            <p>🎉🎉🎉HAPPY!🎉🎉🎉</p>
                            <motion.button 
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                onClick={handleClose}
                            >
                                🤠 Let's Rock n Roll 🎸
                            </motion.button>
                        </>
                        :
                        <div className='game-over-modal'>
                            <h1>🤬 Game Over! 🤬</h1>
                            <div className='modal-stats'>
                                <h2>🥱 Your Stats 🥱</h2>
                                <p>⏳ Survived: {time}</p>
                                <p>Remaining 💰: ${money}</p>
                            </div>
                            <div className='modal-stats'>
                                <h2>😱 Personal Best: 😱</h2>
                                <p>⏳ Survived: {oldStats.currentTime}</p>
                                <p>Remaining 💰: ${oldStats.currentCash}</p>
                            </div>
                            <p className='subtext'>🔥 Remember to 😎 share with 💯 Alan! 💯 🔥</p>
                            <motion.button 
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                onClick={handleClose}
                            >
                                ⏪ Try Again?
                            </motion.button>
                        </div>
                    }
                </motion.div>
            </Backdrop>
    );

}