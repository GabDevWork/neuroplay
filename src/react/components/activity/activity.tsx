import Image from "next/image"
import { useState } from "react";
import { TypeDataActivity } from "../type";
import MenuTop from "../menuTop";

export interface dataActivity{
    dataActivity: TypeDataActivity
}

export default function Activy(props: dataActivity){    

    const [rightAnswer, setRightAnswer] = useState(false);

    function checkAnswer(e: any){
        if(e==props.dataActivity.activityAnswer){
            setRightAnswer(true);
        }
    }
    
    return(
        <div className="activity">
            <MenuTop/>
            {rightAnswer == false ?
                <div className="boxActivity">
                    <div>{props.dataActivity.activityQuestion}</div>
                    {props.dataActivity.activityAlternatives.map((e)=>
                        <div onClick={()=>checkAnswer(e)}>{e}</div>
                    )}
                </div>:
                <div onClick={()=>props.dataActivity.activityComand[0]}>
                    acertou miseravi!
                </div>    
            }
        </div>
    )
}