import { useState } from 'react';

import PassiveIncome from '../hooks/useCounter'
import PerkButtons from './perkOptions'

export default function Perks({updatePerks}) {
    
    const [showPerks, setShowPerks] = useState("options");
    // const money = PassiveIncome(0, 5000, "increment");

    // const workPerk = () => {
    //     updatePerks
    //   }



    const revealPerks = (option) => {
        setShowPerks(option);
    }



    return (
        <div className="perks">
            <button onClick={() => revealPerks("options")}>back btn{showPerks}</button>
            {showPerks === "options" ? 
            
            <>
                <PerkButtons btnType="getCash" updatePerks={revealPerks}/>
                <PerkButtons btnType="getAffection" updatePerks={revealPerks}/>
            </>
            :
            <>
                {showPerks === "money" ? 
                <>
                    <PerkButtons btnType="workAtAMC" updatePerks={workPerk}/>
                    <PerkButtons btnType="gamble" updatePerks={revealPerks}/>
                </>
                :
                <div>amongus</div>
                }
            </>
            }
        </div>
    );
}