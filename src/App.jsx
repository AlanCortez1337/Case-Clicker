import { useState, useEffect } from 'react'
import Reaction from './components/reactions'
import Timer from './components/timer'
import TapBox from './components/clickableArea'
import ProgressBar from './components/statusBar'
import Perks from './components/perks'
import useCounter from './hooks/useCounter'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  // reaction state
  const [newEmojis, setNewEmojis] = useState([]);
  const [currentEmoji, setCurrentEmoji] = useState(["😳","👍", "🤝"]);
  // Custom hook to manage the affection
  // might need to change setModifier to modifier??????
  const [affection, setAffection, setAffectionInteraction, setAffectionModifier, affectionModifier] = useCounter(45, 200, "decrement", 1);
  const [tapMod, setTapMod] = useState(1)
  const [prevAffectionMod, setPrevAffectionMod] = useState(affectionModifier);
  const [money, updateMoney, setMoneyInteraction, setMoneyModifier] = useCounter(10000, 2500, "increment", 1);
  // move timer up here
  // unique toasts to display
  const plushieToasts = ["It ran away", "It some how became inside out", "wear and tear really shows after 10 seconds doesnt it?", "A NEW AMONGUS PLUSHIE DROPPED", "Enough plushie time, its among us time!!!"]
  const bikeToasts = ["You ate the bike chain >:(", "You popped a tire", "You could use a new paint job", "Bike exploded", "Someone stole the bell"]
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
      setAffection(prevAffection => prevAffection + tapMod);
      setAffectionInteraction("tap")
    }
    // the math.random is to choose a random emoji to display from the currentEmoji array
    setNewEmojis([...newEmojis, {emote: currentEmoji[Math.floor(Math.random() * currentEmoji.length)], id: Math.random()}]);
  };
  // update perks function
  const modPerks = (perk, cost) => {
    switch (perk) {
      case "workPerk":
        console.log(perk);
        setAffectionModifier(2);
        setAffectionInteraction("timer");
        setMoneyModifier(11);
        setMoneyInteraction("timer");
        setCurrentEmoji(["💪", "💸", "🍿"]);
        setTimeout(()=>{
          setAffectionModifier(1);
          setAffectionInteraction("timer");
          setMoneyModifier(1);
          setMoneyInteraction("timer");
          setCurrentEmoji(["😳","👍", "🤝"]);
          toast('You Finished your shift!', {
            icon: '👏',
          });
        }, 5000);
        break;
      case "gamble":
        // remove the betting money
        updateMoney(prev => prev -  cost);
        setMoneyInteraction("gamble");
        // calculating if they won
        let chance = Math.floor(Math.random() * 10);
        console.log(chance);
        setTimeout(()=>{
          if(chance < 4) {
            updateMoney(prev => prev +  (2 * cost));
            setMoneyInteraction("gamble");
            // Do a little toast thing
            toast.success("YOU DOUBLED YOUR EARNINGS");
          } else {
            //do the other toast thing
            toast.error("You have terrible luck");
          }
        },3800);
        break;
      case "plushie":
        // make this scalable according to the decrement mod in the future
        setTapMod(prev => prev + 0.25)
        setTimeout(()=>{
          setTapMod(prev => prev - 0.25)
          toast(plushieToasts[(Math.floor(Math.random() * 4))], {
            icon: '🧑‍🚀',
          });
        }, 15000)
        break;
      case "bike":
        //storing the previous affection mod to change back to normal once this is done
        setPrevAffectionMod(affectionModifier);
        // remove the bike money
        updateMoney(prev => prev -  cost);
        // perk benefit
        setAffectionModifier(-0.5);
        setAffectionInteraction("timer")
        // reset and notify that the perk has run out
        setTimeout(()=>{
          setAffectionModifier(prevAffectionMod);
          setAffectionInteraction("timer")
          toast(bikeToasts[(Math.floor(Math.random() * 4))], {
            icon: '🚲',
          });
        }, 5000);
        break;
      case "viola":
        console.log("viola viola viola")
        break;
      default:
        console.log("ERROR WITH modPerks");
    }
  };

  return (
    <div className='game-grid'>
      <Reaction emojis={newEmojis}/>
      <TapBox currentAffection={affection} updateAffection={incrementAffection}/>
      
      <Reaction emojis={newEmojis}/>
      {/* turn this into a compoment called stats or something */}
      <div>Affection Levels: {affection}, Money: {money}</div>
      <div>tap mod: {tapMod}</div>
      
      <ProgressBar currentProgress={affection} width="400px" height="20px" startPoint="0%"/>
      <Timer/>
      {/* yeah ^ */}
      <Perks modifyPerks={modPerks} currentMoney={money}/>
      <Toaster />
    </div>
  )
}

export default App
