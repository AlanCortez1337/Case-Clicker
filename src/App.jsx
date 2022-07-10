import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Icon from './favicon.svg'
import Reaction from './components/reactions'

function App() {
  const [affection, setAffection] = useState(0);
  const [newEmojis, setNewEmojis] = useState(["🙄","😫","🙄","😫","🙄"]);
  const [showEmojis, setShowEmojis] = useState(false);


  const handleClick = () => {
    setAffection((affection) => affection + 1);
    setNewEmojis(["😫","😫","😫","😫","😫"]);
    setShowEmojis(true);
  }

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis} showEmotes={showEmojis}/>
      {/* clickable area */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        <img src={Icon} alt="asdf" />
      </motion.div>
      <Reaction emojis={newEmojis} showEmotes={showEmojis}/>
      <div>Affection Levels: {affection}</div>
    </div>
  )
}

export default App
