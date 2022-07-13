import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Icon from './favicon.svg'
import Reaction from './components/reactions'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState("😳");
  // affection tally
  const [affection, setAffection] = useState(100);
  const [startTimer, setStartTimer] = useState(false);
  // Visual to show that the affection is low
  useEffect(()=>{
    // So like I push too many and it causes an oopsie
    if (affection === 25) {
      // setCurrentEmoji("😡");
      setCurrentEmotion([
        ...newEmojis, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}
      ]);
      
    } else if (affection === 50) {
      // setCurrentEmoji("😔");
      setCurrentEmotion([
        ...newEmojis, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}
      ]);
    } else if (affection === 75) {
      // setCurrentEmoji("😐");
      setCurrentEmotion([
        ...newEmojis, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}
      ]);

    } else if (affection > 75) {
      // setCurrentEmoji("😳");
      // setNewEmojis([...newEmojis, {emote: currentEmoji, id: Math.random()}]);
    }
  }, [affection]);

  // This is to decrement the affection since the person is getting bored
  useEffect(()=>{
    if(!startTimer) {
      setTimeout(() => {
        if(affection > 0) {
        setAffection((affection) => affection - 1);
        }
      }, 1000);
    }
  }, [affection, startTimer]);
  // A timer to wait 1 second and see if the player is clicking, if not then the timer can decrement again
  useEffect(()=>{
    setTimeout(() => {
      if(startTimer) {
        setStartTimer(false);
      }
    }, 1000);
  },[startTimer]);
  // A purge to remove old emotes that no logner exist
  useEffect(()=>{
    if(newEmojis.length >= 10) {
      setNewEmojis([...newEmojis.slice(0, 1),
      ...newEmojis.slice(6, newEmojis.length)]);
    }
  },[newEmojis])

  const handleClick = () => {
    if(affection < 100) {
      setAffection((affection) => affection + 1 );
    }
    setNewEmojis([...newEmojis, {emote: currentEmoji, id: Math.random()}]);
    setStartTimer(true);
  };

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis}/>
      {/* clickable area */}
      <button onClick={handleClick} className="clickable-area">
        <motion.img 
        whileTap={{ scale: 0.9 }}
        src={Icon} alt="clickable area" />
        <Reaction emojis={currentEmotion}/>
      </button>
      <Reaction emojis={newEmojis}/>
      <div>Affection Levels: {affection}</div>
    </div>
  )
}

export default App
