import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Modal from './components/modal'
import Reaction from './components/reactions'
import TapBox from './components/clickableArea'
import Perks from './components/perks'
import Stats from './components/displayStats'
import Title from './components/title'
import useCounter from './hooks/useCounter'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState([{emoji: "😳", id: "default"},{emoji: "👍", id: "default"},{emoji: "🤝", id: "default"}]);
  const [purgeCurrentEmoji, setPurgeCurrentEmoji] = useState("");
  // Custom hook to manage the affection
  // might need to change setModifier to modifier??????
  const [setAffectionTimerOff, affection, setAffection, setAffectionInteraction, setAffectionModifier, affectionModifier] = useCounter(true, 45, 200, "decrement", 0);
  const [tapMod, setTapMod] = useState(1);
  const [lives, setLives] = useState(0);
  const [prevAffectionMod, setPrevAffectionMod] = useState(affectionModifier);
  const [setMoneyTimerOff, money, updateMoney, setMoneyInteraction, setMoneyModifier] = useCounter(true, 0, 2500, "increment", 0);
  // move timer up here
  // unique toasts to display
  const plushieToasts = ["It ran away", "It some how became inside out", "wear and tear really shows after 10 seconds doesnt it?", "A NEW AMONGUS PLUSHIE DROPPED GET IT", "Enough plushie time, its among us time!!!"]
  const bikeToasts = ["You ate the bike chain >:(", "You popped a tire", "You could use a new paint job", "Bike exploded", "Someone stole the bell"]
  const violaToasts = ["you gained an extra life 3>", "you gained an extra life <3", "new life who dis", "Better than violins", "Hang out is finished"]
  // Modal state
  const [infoModalOpen, setInfoModalOpen] = useState(true);
  // Time State
  const [pauseTime, setPauseTime] = useState(true);
  const [time, setTime] = useState("")
  const [gameOver, setGameOver] = useState(false);
  // perk timeouts
  const [workTimer, setWorkTimer] = useState(0);
  const [gambleTimer, setGambleTimer] = useState(0);
  const [plushieTimer, setPlushieTimer] = useState(0);
  const [bikeTimer, setBikeTimer] = useState(0);
  const [violaTimer, setViolaTimer] = useState(0);
  // localStorage
  const [oldScore, checkOldScore] = useLocalStorage("00:00:00", -1);
  // A purge to remove old emotes that no longer exist
  useEffect(()=>{
    if (newEmojis.length >= 10) {
      setNewEmojis([...newEmojis.slice(0, 1),
      ...newEmojis.slice(6, newEmojis.length)]);
    }
  },[newEmojis])
  // game over / tracking of lives
  useEffect(()=>{
  //lives
  if(affection < 5 && lives > 0) {
    setAffection(40)
    setAffectionInteraction("reset")
    setLives(prev => prev - 1)
  // game over
  }else if (affection <= 0) {
    setGameOver(true);
    // stop the timers
    setMoneyTimerOff(true);
    setPauseTime(true);
    setCurrentEmoji([{emoji: "😳", id: "default"},{emoji: "👍", id: "default"},{emoji: "🤝", id: "default"}]);
  }
  },[affection])
  // increments affection meter and displays emojis
  const incrementAffection = () => {
    if(affection < 100) {
      setAffection(prevAffection => prevAffection + tapMod);
      setAffectionInteraction("tap")
    }
    // the math.random is to choose a random emoji to display from the currentEmoji array
    setNewEmojis([...newEmojis, {emote: currentEmoji[Math.floor(Math.random() * currentEmoji.length)].emoji, id: Math.random()}]);
  };
  // purge the old emotes that should no longer show up when tapping 
  useEffect(()=>{
    if(purgeCurrentEmoji !== "refresh") {
      setCurrentEmoji([...currentEmoji.filter(emoji => {return emoji.id !== purgeCurrentEmoji})]);
    }
  },[purgeCurrentEmoji])
  // update perks function
  const modPerks = (perk, cost) => {
    setPurgeCurrentEmoji("refresh");
    switch (perk) {
      case "workPerk":
        setAffectionModifier(2);
        setAffectionInteraction("timer");
        setMoneyModifier(11);
        setMoneyInteraction("timer");
        setCurrentEmoji([...currentEmoji,{emoji: "💸", id: "work"},{emoji: "🍿", id: "work"}]);
        setWorkTimer(
          setTimeout(()=>{
            setPurgeCurrentEmoji("work");
            setAffectionModifier(1);
            setAffectionInteraction("timer");
            setMoneyModifier(1);
            setMoneyInteraction("timer");
            toast('You Finished your shift!', {
              icon: '👏',
            });
          }, 5000)
        )
        break;
      case "gamble":
      // remove the betting money
      updateMoney(prev => prev -  cost);
      setMoneyInteraction("gamble");
      // calculating if they won
      let chance = Math.floor(Math.random() * 10);
      setCurrentEmoji([...currentEmoji, {emoji: "🎲", id: "gamble"},{emoji: "💰", id: "gamble"}]);
      // storing the id of the timeout
      setGambleTimer(
        // executing the timeout of the gamble perk waiting to reset it once the time runs out
        setTimeout(()=>{
          setPurgeCurrentEmoji("gamble");
          if(chance < 4) {
            updateMoney(prev => prev +  (2 * cost));
            setMoneyInteraction("gamble");
            // Do a little toast thing
            toast.success("YOU DOUBLED YOUR EARNINGS");
          } else {
            //do the other toast thing
            toast.error("You have terrible luck");
          }
        },3800)
      )
      break;
      case "plushie":
        // make this scalable according to the decrement mod in the future
        setTapMod(prev => prev + 0.25)
        setCurrentEmoji([...currentEmoji, {emoji: "🚀", id: "plushie"},{emoji: "🔪", id: "plushie"}]);
        setPlushieTimer(
          setTimeout(()=>{
            setPurgeCurrentEmoji("plushie");
            setTapMod(prev => prev - 0.25)
            toast(plushieToasts[(Math.floor(Math.random() * 4))], {
              icon: '🚀',
            })
          }, 10000)
        )
      break;
      case "bike":
        //storing the previous affection mod to change back to normal once this is done
      setPrevAffectionMod(affectionModifier);
      // remove the bike money
      updateMoney(prev => prev -  cost);
      // perk benefit
      setAffectionModifier(-0.5);
      setAffectionInteraction("timer")
      setCurrentEmoji([...currentEmoji, {emoji: "🚲", id: "bike"}, {emoji: "💪", id: "bike"}]);
      setBikeTimer(
        // reset and notify that the perk has run out
        setTimeout(()=>{
          setPurgeCurrentEmoji("bike");
          setAffectionModifier(prevAffectionMod);
          setAffectionInteraction("timer")
          toast(bikeToasts[(Math.floor(Math.random() * 4))], {
            icon: '🚲',
          });
        }, 7000)
      )
      break;
      case "viola":
        updateMoney(prev => prev -  cost);
        setCurrentEmoji([...currentEmoji, {emoji: "❤️", id: "viola"}, {emoji: "🎻", id: "viola"}]);
        setViolaTimer(
          setTimeout(()=>{
            setPurgeCurrentEmoji("viola");
            setLives(prev => prev + 1);
            toast(violaToasts[(Math.floor(Math.random() * 4))], {icon: '❤️'});
          }, 12000)
        )
      break;
      default:
        console.log("ERROR WITH modPerks");
    }
  };
  // Clears all the potentially active timeouts from the perks once the user loses
  useEffect(()=>{
    if(gameOver) {
      clearTimeout(workTimer);
      clearTimeout(gambleTimer);
      clearTimeout(plushieTimer);
      clearTimeout(bikeTimer);
      clearTimeout(violaTimer);
    }
  },[gameOver])
  // When Time Changes we want to save it to local storage
  useEffect(()=>{
    if(time !== "") {

      checkOldScore({currentTime: time, currentCash: money});
      console.log("time: ",time, "\n",oldScore.currentTime);
    }
  },[time])
  // close modal
  const close = () => setInfoModalOpen(false);
  // Start the game once the tutorial modal closes
  useEffect(()=>{
    if(!infoModalOpen) {
      setPauseTime(false);
      setAffectionTimerOff(false);
      setMoneyTimerOff(false);
      setAffectionModifier(1);
      setMoneyModifier(1);
      setPrevAffectionMod(1);
    }
  },[infoModalOpen])
  // resets all the modifiers and numbers back to its starting parts
  const restartGame = () => {
    // restart affection
    setAffectionInteraction("timer");
    setAffection(45);
    setAffectionModifier(1);
    // restart timer
    setPauseTime(false);
    // restart money
    setMoneyInteraction("timer");
    updateMoney(0);
    setMoneyTimerOff(false);
    setMoneyModifier(1);
    // restart lives
    setLives(0);
    // close modal
    setGameOver(false);
  }
  return (
    <>
      {/* Intro Welcome Modal */}
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {infoModalOpen && <Modal infoModalOpen={infoModalOpen} handleClose={close} modalType={"intro"}/>}
      </AnimatePresence>
      {/* Game Over Modal */}
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {gameOver &&
          <Modal 
            infoModalOpen={infoModalOpen} 
            handleClose={restartGame} 
            modalType={"gameover"}
            time={time}
            money={money}
          />
        }
      </AnimatePresence>

      <div className='game-grid'>
        <Title/>
        <Reaction emojis={newEmojis} variant={1}/>
        <TapBox updateAffection={incrementAffection}/>
        <Reaction emojis={newEmojis} variant={2}/>
        <Stats affectionMeter={affection} currentMoney={money} currentLives={lives} startTimer={pauseTime} passTime={(finalTime)=> setTime(finalTime)}/>
        <Perks modifyPerks={modPerks} currentMoney={money} restart={gameOver}/>
        <Toaster 
          position="top-left" 
          toastOptions={{
            style: {
                  border: '8px solid #251A12',
                  padding: '10px',
                  fontSize: '18px',
                  fontWeight: '500',
                  background: '#3B291D',
                  color: '#f8f8f8',
                },
          }}
        />
      </div>
    </>
    );
}

export default App
