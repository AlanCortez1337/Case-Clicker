import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';

export default function Perks({modifyPerks}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [workDisabled, workCost, workQuantity, workChange, workTime] = usePerkStatus(-1);
    const [gambleDisabled, gambleCost, gambleQuantity, gambleChange, gambleTime] = usePerkStatus(5);


    const chosenPerk = (perkOption) => {
        modifyPerks(perkOption)
        // need to disable current perk if necessary
        console.log("tapped", perkOption)
        workChange(perkOption)
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
                        btnType="workAtAMC" 
                        updatePerks={() => chosenPerk("workPerk")} 
                        cost={workCost} 
                        disabled={workDisabled}
                        backgroundColor={"#2FBF71"}
                        timer={workTime}
                    />
                    <PerkButtons 
                        btnType="gamble"
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