import { useState, useEffect } from 'react'
import Reaction from './components/reactions'
import Timer from './components/timer'
import TapBox from './components/clickableArea'
import ProgressBar from './components/statusBar'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [currentEmotion, setCurrentEmotion] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState("😳");
  // affection tally
  const [affection, setAffection] = useState(45);
  const [startTimer, setStartTimer] = useState(false);
  // current timer
  const [currentTime, setCurrentTime] = useState(0);
  // Visual to show that the affection is low
  useEffect(()=>{
    if (affection === 10) {
      // setCurrentEmoji("😳");
      setCurrentEmotion([
        {emote: "😈", id: Math.random()}, 
        {emote: "😈", id: Math.random()}, 
        {emote: "😈", id: Math.random()}, 
        {emote: "😈", id: Math.random()}, 
        {emote: "😈", id: Math.random()}
      ]);
    } else if (affection === 25) {
      // setCurrentEmoji("😡");
      setCurrentEmotion([
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}, 
        {emote: "😡", id: Math.random()}
      ]);
      
    } else if (affection === 50) {
      // setCurrentEmoji("😔");
      setCurrentEmotion([
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}, 
        {emote: "😔", id: Math.random()}
      ]);
    } else if (affection === 75) {
      // setCurrentEmoji("😐");
      setCurrentEmotion([
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}, 
        {emote: "😐", id: Math.random()}
      ]);

    } 
  }, [affection]);

  // This is to decrement the affection since the person is getting bored
  useEffect(()=>{
    if(!startTimer) {
      setTimeout(() => {
        if(affection > 0) {
        setAffection((affection) => affection - 1);
        }
      }, 250);
    }
  }, [affection, startTimer]);
  // A timer to wait 1 second and see if the player is clicking, if not then the timer can decrement again
  useEffect(()=>{
    setTimeout(() => {
      if(startTimer) {
        setStartTimer(false);
      }
    }, 300);
  },[startTimer]);
  // A purge to remove old emotes that no logner exist
  useEffect(()=>{
    if(newEmojis.length >= 10) {
      setNewEmojis([...newEmojis.slice(0, 1),
      ...newEmojis.slice(6, newEmojis.length)]);
    }
  },[newEmojis])

  const incrementAffection = () => {
    if(affection < 100) {
      setAffection((affection) => affection + 1 );
    }
    setNewEmojis([...newEmojis, {emote: currentEmoji, id: Math.random()}]);
    setStartTimer(true);
  };

  const theCurrentTime = (time) => {
    setCurrentTime(time);
  }

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis}/>
      <TapBox reactions={currentEmotion} updateAffection={incrementAffection}/>
      
      <Reaction emojis={newEmojis}/>
      <div>Affection Levels: {affection}</div>
      <ProgressBar currentProgress={affection}/>
      <Timer updateTime={theCurrentTime}/>
    </div>
  )
}

export default App
