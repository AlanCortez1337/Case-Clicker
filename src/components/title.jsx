import { motion } from "framer-motion";

export default function Title () {

    const rotateTransition = {
        ease: "easeInOut",
        duration: 3,
        repeat: "Infinity",
        repeatType: "mirror"
    };

    return(
        <motion.h1
            initial={{rotate: 0}}
            animate={{rotate: [-5, 5]}}
            whileTap={{ scale: 0.9 }}
            transition={rotateTransition}
            className="title-box"
        >
            Case Clicker
        </motion.h1>
    );
}