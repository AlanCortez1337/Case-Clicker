import { useState, useEffect } from 'react'
import Reaction from './components/reactions'
import Timer from './components/timer'
import TapBox from './components/clickableArea'
import ProgressBar from './components/statusBar'
import Perks from './components/perks'
import AffectionCounter from './hooks/useCounter'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState("😳");
  // Custom hook to manage the affection
  // might need to change setModifier to modifier??????
  const [affection, setAffection, setInteraction, setModifier] = AffectionCounter(45, 250, "decrement", 1)
  // A purge to remove old emotes that no logner exist
  useEffect(()=>{
    if (newEmojis.length >= 10) {
      setNewEmojis([...newEmojis.slice(0, 1),
      ...newEmojis.slice(6, newEmojis.length)]);
    }
  },[newEmojis])
  // increments affection meter and displays emojis
  const incrementAffection = () => {
    if(affection < 100) {
      setAffection(prevAffection => prevAffection + 1);
      setInteraction("tap")
    }
    setNewEmojis([...newEmojis, {emote: currentEmoji, id: Math.random()}]);
  };

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis}/>
      <TapBox currentAffection={affection} updateAffection={incrementAffection}/>
      
      <Reaction emojis={newEmojis}/>
      <div>Affection Levels: {affection}</div>
      <ProgressBar currentProgress={affection}/>
      <Timer/>
      <Perks/>

    </div>
  )
}

export default App
