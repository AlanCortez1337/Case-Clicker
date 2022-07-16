import { useState } from 'react';
import PerkButtons from './perkOptions'
import usePerkStatus from '../hooks/usePerkStatus';
import useCounter from '../hooks/useCounter';

export default function Perks({modifyPerks}) {
    
    const [showPerks, setShowPerks] = useState("options");
    const [timeLeft, updateTimeLeft] = useCounter(90, 100, "decrement", 1);
    const [gambleDisabled, gambleCost, gambleQuantity, gambleChange] = usePerkStatus(5);


    const chosenPerk = (perkOption) => {
        // This aint working
        modifyPerks(perkOption)
        // need to disable current perk if necessary
        console.log("tapped", perkOption)
        updateTimeLeft(90)
        gambleChange(perkOption)
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
                    {/* <PerkButtons btnType="workAtAMC" updatePerks={() => chosenPerk("workPerk")} cost={-1} disabled={disabled}/> */}
                    <PerkButtons 
                        btnType="gamble" 
                        updatePerks={() => chosenPerk("gamble")} 
                        cost={gambleCost} 
                        disabled={gambleDisabled} 
                        backgroundColor={"#2FBF71"}
                        timer={timeLeft}
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