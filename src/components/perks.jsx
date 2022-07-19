import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';

export default function Perks({modifyPerks, currentMoney}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [workDisabled, workCost, workQuantity, workChange, workTime] = usePerkStatus(-1, 32, 5000);
    const [gambleDisabled, gambleCost, gambleQuantity, gambleChange, gambleTime] = usePerkStatus(5, 22, 3800);


    const chosenPerk = (perkOption) => {
        // need to disable current perk if necessary
        if(perkOption === "workPerk") {
            // disable button
            workChange(perkOption)
            // update numbers
            console.log(workDisabled)
            modifyPerks(perkOption, workCost)
        } else if (perkOption === "gamble") {
            if(currentMoney >= gambleCost) {
                // disable button
                gambleChange(perkOption)
                // update numbers
                modifyPerks(perkOption, gambleCost)
            }
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
                    updatePerks={revealPerks} 
                    cost={-1} 
                    backgroundColor={"#2FBF71"}
                />
                <PerkButtons 
                    btnType="😳" 
                    updatePerks={revealPerks} 
                    cost={-1} 
                    backgroundColor={"#EF2D56"}
                />
            </>
            :
            <>
                {showPerks === "money" ? 
                <>
                    <PerkButtons 
                        btnType="🍿Work At AMC🍿" 
                        updatePerks={() => chosenPerk("workPerk")} 
                        cost={workCost} 
                        disabled={workDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={workTime}
                    />
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
                <div>amongus</div>
                }
            </>
            }
        </div>
    );
}