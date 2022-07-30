import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';
import toast from 'react-hot-toast'


export default function Perks({modifyPerks, currentMoney, restart}) {
    
    const [workDisabled, workCost, workChange, workTime] = usePerkStatus(-1, 32, 5000);
    const [gambleDisabled, gambleCost, gambleChange, gambleTime, endGamble] = usePerkStatus(5, 22, 3800);
    const [plushieDisabled, plushieCost, plushieChange, plushieTime, endPlushie] = usePerkStatus(15, 80, 12000);
    const [bikeDisabled, bikeCost, bikeChange, bikeTime, endBike] = usePerkStatus(30, 50, 7000);
    const [violaDisabled, violaCost, violaChange, violaTime, endViola] = usePerkStatus(100, 100, 14000);


    const chosenPerk = (perkOption) => {
        // need to disable current perk if necessary
        switch(perkOption) {
            case "workPerk":
                // disable button
                workChange(perkOption);
                // update numbers
                modifyPerks(perkOption);
                break;
            case "gamble":
                if (currentMoney >= gambleCost) {
                    // disable button
                    gambleChange(perkOption);
                    // update numbers
                    modifyPerks(perkOption, gambleCost);
                    // shoot up a ton of emojis????
                } else {
                    toast.error("You dont have enough money for this!")
                }
                break;
            case "plushie":
                // buy
                if (currentMoney >= plushieCost) {
                    // disable button
                    plushieChange(perkOption);
                    // update numbers
                    modifyPerks(perkOption, plushieCost);
                    // shoot up a ton of emojis????
                } else {
                    toast.error("You dont have enough money for this!")
                }
                break;
            case "bike":
                if (currentMoney >= bikeCost) {
                    // disable button
                    bikeChange(perkOption);
                    // update numbers
                    modifyPerks(perkOption, bikeCost);
                    // shoot up a ton of emojis????
                } else {
                    toast.error("You dont have enough money for this!")
                }
                break;
            case "viola":
                if (currentMoney >= violaCost) {
                    // disable button
                    violaChange(perkOption);
                    // update numbers
                    modifyPerks(perkOption, violaCost);
                    // shoot up a ton of emojis????
                } else {
                    toast.error("You dont have enough money for this!")
                }
                break;
            default:
                console.log("ERROR WITH chosenPerk");
        }
    }

    useEffect(()=>{
        if(restart) {
            endGamble({price: 5, end: true});
            endPlushie({price: 15, end: true});
            endBike({price: 30, end: true});
            endViola({price: 100, end: true});
        }
    },[restart])

    return (
        <section className="perk-menu">
            <h1 className='perk-title'>PERKS!!!!</h1>
            <PerkButtons 
                btnName="AMC" 
                updatePerks={() => chosenPerk("workPerk")} 
                cost={workCost} 
                disabled={workDisabled}
                timer={workTime}
                info="Earn more money at the cost of happiness"
            />
            <PerkButtons 
                btnName="Gamble"
                updatePerks={() => chosenPerk("gamble")} 
                cost={gambleCost} 
                disabled={gambleDisabled} 
                timer={gambleTime}
                info="Gamble for a chance to double your bet"
            />
            <PerkButtons 
                btnName="Plushie" 
                updatePerks={() => chosenPerk("plushie")} 
                cost={plushieCost} 
                disabled={plushieDisabled}
                timer={plushieTime}
                info="Tapping with this friend increases the effectiveness"
            />
            <PerkButtons 
                btnName="Bike" 
                updatePerks={() => chosenPerk("bike")} 
                cost={bikeCost} 
                disabled={bikeDisabled}
                timer={bikeTime}
                info="Passively become happy for a short time"
            />
            <PerkButtons 
                btnName="Viola" 
                updatePerks={() => chosenPerk("viola")} 
                cost={violaCost} 
                disabled={violaDisabled}
                timer={violaTime}
                info="Gain an extra life"
            />
        </section>
    );
}