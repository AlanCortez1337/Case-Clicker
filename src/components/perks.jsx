import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';
import toast from 'react-hot-toast'


export default function Perks({modifyPerks, currentMoney}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [workDisabled, workCost, workChange, workTime, workQuantity] = usePerkStatus(-1, -1, 32, 5000);
    const [gambleDisabled, gambleCost, gambleChange, gambleTime, gambleQuantity] = usePerkStatus(5, -1, 22, 3800);
    const [plushieDisabled, plushieCost, plushieChange, plushieTime, plushieQuantity, updatePlushieQuantity] = usePerkStatus(15, 0, 22, 3800);
    const [bikeDisabled, bikeCost, bikeChange, bikeTime, bikeQuantity] = usePerkStatus(30, -1, 32, 5000);
    const [violaDisabled, violaCost, violaChange, violaTime, violaQuantity] = usePerkStatus(500, -1, 22, 3800);


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
                    if(plushieQuantity < 5) {
                        updatePlushieQuantity(prev => prev + 1);
                        
                        // update numbers
                        // shoot up a ton of emojis????
                    } else {
                        toast.error("5 plushies max")
                    }
                } else {
                    toast.error("You dont have enough money for this!")
                }
                // update numbers

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
                    quantity={-1} 
                    backgroundColor={"#2FBF71"}
                />
                <PerkButtons 
                    btnType="😳" 
                    updatePerks={() => revealPerks("affection")} 
                    cost={-1} 
                    quantity={-1} 
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
                        quantity={workQuantity} 
                        disabled={workDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={workTime}
                    />
                    {/* gamble */}
                    <PerkButtons 
                        btnType="🎲Gamble🎲"
                        updatePerks={() => chosenPerk("gamble")} 
                        cost={gambleCost} 
                        quantity={gambleQuantity} 
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
                        updatePerks={() => chosenPerk("plushie")} 
                        cost={plushieCost} 
                        quantity={plushieQuantity} 
                        disabled={plushieDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={plushieTime}
                    />
                    {/* bike */}
                    <PerkButtons 
                        btnType="bike" 
                        updatePerks={() => chosenPerk("bike")} 
                        cost={bikeCost} 
                        quantity={bikeQuantity} 
                        disabled={bikeDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={bikeTime}
                    />
                    {/* viola */}
                    <PerkButtons 
                        btnType="Viola" 
                        updatePerks={() => chosenPerk("viola")} 
                        cost={violaCost} 
                        quantity={violaQuantity} 
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