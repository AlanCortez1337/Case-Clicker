import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Icon from './favicon.svg'
import Reaction from './components/reactions'

function App() {
  const [affection, setAffection] = useState(0);
  const [newEmojis, setNewEmojis] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);

  // useEffect(()=>{
  //   console.log(newEmojis);
  //   if(newEmojis.length > 5) {
  //     setTimeout(()=>{
  //       setNewEmojis(newEmojis.filter((_, index) => index === 0));
  //       console.log(newEmojis.filter((_, index) => index === 0));
        
  //     }, 1000);
  //   }
  // },[newEmojis]);


  const handleClick = () => {
    setAffection((affection) => affection + 1);
    setNewEmojis([...newEmojis, {emote:"😫", id: affection}]);
    console.log(newEmojis);
    if(newEmojis.length === 8) {
        setNewEmojis([...newEmojis.slice(0, 1),
        ...newEmojis.slice(2, newEmojis.length)]);
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
