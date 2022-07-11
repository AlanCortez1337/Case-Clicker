import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Icon from './favicon.svg'
import Reaction from './components/reactions'

function App() {
  const [affection, setAffection] = useState(0);
  // The idea for this was to increase the amount of times the loop will happen in reactions.jsx each time they click, and turns 0 if nothign happens for a minute but idk anymore
  // const [emojiRepeat, setEmojiRepeat] = useState(1);
  const [newEmojis, setNewEmojis] = useState(["😫"]);
  const [showEmojis, setShowEmojis] = useState(false);

  // useEffect(()=>{
  //   console.log("current:", showEmojis)
  //   // possibly need to fix logic
  //   if (showEmojis) {
  //     setTimeout(()=>{
  //       setShowEmojis(false);
  //     }, 5000)
  //   }
  // },[showEmojis]);

  const handleClick = () => {
    setAffection((affection) => affection + 1);
    // console.log("before",newEmojis)
    // setNewEmojis([...newEmojis, newEmojis.push("😫")]);
    // console.log(newEmojis)
    // if(newEmojis.length > 3) {
    //   console.log(typeof(newEmojis[1]))
    // }
    setNewEmojis([...newEmojis, "😫"]);
    setShowEmojis(true);
  }

  return (
    <div className='game-grid'>
      {/* <Reaction emojis={newEmojis} showEmotes={showEmojis}/> */}
      {/* test */}
      <div className='box'>

        {newEmojis.map((emotes) => {
          return(

            <motion.div
                style={{fontSize: `28px`}}
                initial={{ opacity: 1 }}
                animate={{ y: `450px`, opacity: 0 }}
                transition={{
                    repeat: '0',
                    duration: `1`,
                    ease: "easeInOut",
                }}
            >{emotes}</motion.div>
          );
        })
        }
      </div>



      {/* clickable area */}
      <button onClick={handleClick}>
        {/* <motion.img 
        whileTap={{ scale: 0.9 }}
        src={Icon} alt="asdf" /> */}
      </button>
      {/* <Reaction emojis={newEmojis} showEmotes={showEmojis}/> */}
      <div>Affection Levels: {affection}</div>
    </div>
  )
}

export default App
