import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Icon from './favicon.svg'
import Reaction from './components/reactions'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  // affection tally
  const [affection, setAffection] = useState(100);

  useEffect(()=>{
    console.log(affection)
    if(!showEmojis) {
      setTimeout(() => {
        if(affection > 0) {
        setAffection((affection) => affection - 1);
        }
      }, 1000);
    }
    
  }, [affection, showEmojis]);

  useEffect(()=>{
    setTimeout(() => {
      if(showEmojis) {
        setShowEmojis(false);
      }
    }, 1000);
  },[showEmojis]);


  const handleClick = () => {
    if(affection < 100) {
      
      setAffection((affection) => affection + 1 );
    }
    setNewEmojis([...newEmojis, {emote:"👀", id: Math.random()}]);
    console.log(newEmojis);
    if(newEmojis.length === 10) {
        setNewEmojis([...newEmojis.slice(0, 1),
        ...newEmojis.slice(6, newEmojis.length)]);
    }
    setShowEmojis(true);
  };

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis} showEmotes={showEmojis}/>
      {/* test */}
      



      {/* clickable area */}
      <button onClick={handleClick}>
        <motion.img 
        whileTap={{ scale: 0.9 }}
        src={Icon} alt="asdf" />
      </button>
      <Reaction emojis={newEmojis} showEmotes={showEmojis}/>
      <div>Affection Levels: {affection}</div>
    </div>
  )
}

export default App
