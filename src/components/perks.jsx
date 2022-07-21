import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';
import toast from 'react-hot-toast'


export default function Perks({modifyPerks, currentMoney}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [workDisabled, workCost, workChange, workTime] = usePerkStatus(-1, 32, 5000);
    const [gambleDisabled, gambleCost, gambleChange, gambleTime] = usePerkStatus(5, 22, 3800);
    const [plushieDisabled, plushieCost, plushieChange, plushieTime] = usePerkStatus(15, 90, 10000);
    const [bikeDisabled, bikeCost, bikeChange, bikeTime] = usePerkStatus(30, 32, 5000);
    const [violaDisabled, violaCost, violaChange, violaTime] = usePerkStatus(500, 22, 3800);


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


    const plushiePerk = () => {
        // buy
        if (currentMoney >= plushieCost) {
            // disable button

            plushieChange("plushie");
            modifyPerks("plushie", plushieCost);
            
            // update numbers
            // shoot up a ton of emojis????
        } else {
            toast.error("You dont have enough money for this!")
        }
        // update numbers

    }

    const revealPerks = (option) => {
        setShowPerks(option);
    }

    return (
        <div className="perks">
            <button onClick={() => revealPerks("options")}>back btn{showPerks}</button>
            {showPerks === "options" ? 
            
            <>
                <PerkButtons 
                    btnType="💰" 
                    updatePerks={() => revealPerks("money")} 
                    cost={-1} 
                    backgroundColor={"#2FBF71"}
                />
                <PerkButtons 
                    btnType="😳" 
                    updatePerks={() => revealPerks("affection")} 
                    cost={-1}  
                    backgroundColor={"#EF2D56"}
                />
            </>
            :
            <>
                {showPerks === "money" ? 
                <>
                    {/* work at AMC */}
                    <PerkButtons 
                        btnType="🍿Work At AMC🍿" 
                        updatePerks={() => chosenPerk("workPerk")} 
                        cost={workCost} 
                        disabled={workDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={workTime}
                    />
                    {/* gamble */}
                    <PerkButtons 
                        btnType="🎲Gamble🎲"
                        updatePerks={() => chosenPerk("gamble")} 
                        cost={gambleCost} 
                        disabled={gambleDisabled} 
                        backgroundColor={"#2FBF71"}
                        timer={gambleTime}
                    />
                </>
                :
                <>
                    {/* Play with plushie */}
                    <PerkButtons 
                        btnType="Play with son" 
                        updatePerks={() => plushiePerk()} 
                        cost={plushieCost} 
                        disabled={plushieDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={plushieTime}
                    />
                    {/* bike */}
                    <PerkButtons 
                        btnType="bike" 
                        updatePerks={() => chosenPerk("bike")} 
                        cost={bikeCost} 
                        disabled={bikeDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={bikeTime}
                    />
                    {/* viola */}
                    <PerkButtons 
                        btnType="Viola" 
                        updatePerks={() => chosenPerk("viola")} 
                        cost={violaCost} 
                        disabled={violaDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={violaTime}
                    />
                </>
                }
            </>
            }
        </div>
    );
}