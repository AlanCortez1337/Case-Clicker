import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';

export default function Perks({modifyPerks, currentMoney}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [workDisabled, workCost, workQuantity, workChange, workTime] = usePerkStatus(-1, -1, 32, 5000);
    const [gambleDisabled, gambleCost, gambleQuantity, gambleChange, gambleTime] = usePerkStatus(5, -1, 22, 3800);
    const [plushieDisabled, plushieCost, plushieQuantity, plushieChange, plushieTime] = usePerkStatus(15, 0, 22, 3800);
    const [bikeDisabled, bikeCost, bikeQuantity, bikeChange, bikeTime] = usePerkStatus(30, -1, 22, 3800);
    const [violaDisabled, violaCost, violaQuantity, violaChange, violaTime] = usePerkStatus(1000, -1, 22, 3800);


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
                // disable button
                gambleChange(perkOption);
                // update numbers
                modifyPerks(perkOption, gambleCost);
                // shoot up a ton of emojis????
                break;
            case "plushie":
                plushieChange(perkOption);
                modifyPerks(perkOption, plushieCost);
                break;
            case "bike":
                bikeChange(perkOption);
                modifyPerks(perkOption, bikeCost);
                break;
            case "viola":
                violaChange(perkOption);
                modifyPerks(perkOption, violaCost);
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