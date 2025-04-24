import MenuTop from "../../../components/menuTop"
import Activy from "../../../components/activity/activity"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TypeDataActivity } from "../../../components/type"

let dataAlerts:TypeDataActivity ={
    activityQuestion: "",
    activityAlternatives: [],
    activityAnswer: "",
    activityComand: [],
}

export default function Home(){

    const [showActivity, setShowActivity] = useState(false);

    useEffect(() => {
        getProgress();
     }, [])

    async function getProgress() {
        
    }


    function seeActivity(){
        setShowActivity(true);
        dataAlerts = {
            activityQuestion: "Qual o som do a?",
            activityAlternatives: ["a", "b", "c", "d"],
            activityAnswer: "a",
            activityComand: [()=>setShowActivity(false)],
        }
    }

    return(
        <div className="bodyHome">
            <div>
                <MenuTop/>
            </div>
            <div className="homeBox">
                <div className="columActivy1">
                    <div className="cardActivity1" onClick={()=>seeActivity()}></div>
                </div>
                <div className="columActivy2">
                    <div className="cardActivity2" onClick={()=>seeActivity()}></div>
                </div>
                <div className="columActivy3">
                    <div className="cardActivity3" onClick={()=>seeActivity()}></div>
                </div>
                <div className="columActivy4">    
                    <div className="cardActivity4" onClick={()=>seeActivity()}></div>
                </div>
            </div>
            {showActivity&& <Activy dataActivity={dataAlerts}/>}
        </div>
    )
}