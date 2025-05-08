import Image from "next/image"
import { useState } from "react";
import { TypeDataLevel, TypeDataAlerts } from "../type";
import Alerts from "../alerts/alerts";
import MenuTop from "../menuTop";

export interface dataActivity {
    dataLevel: TypeDataLevel
}

interface ActivityItem {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
}

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
}

export default function Activy(props: dataActivity) {    
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [seeIntro, setSeeIntro] = useState("boxIntro");
    const [seeActivity, setSeeActivity] = useState("boxActivityDontShow");
    const [seeLevelStamp, setLevelStamp] = useState("boxLevelStampDontShow");
    const [seeAnimalDescription, setAnimalDescription] = useState("boxAnimalDescriptionDontShow")
    let currentActivity = activities[currentIndex];
    const [showAlerts, setshowAlerts] = useState(false);

    function checkAnswer(option: string) {
        if (option === currentActivity.answer) {
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Resposta correta!",
                alertButtons: ["Proxima pergunta"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
            nextActivity()
        }
        else{
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Resposta incorreta, voltaremos nela mais tarde!",
                alertButtons: ["Proxima pergunta"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
            nextActivity()
        }
    }

    async function getActivity() {
        try {
            const indexLevel = props.dataLevel.levelId;
            const endpoint = `/api/apiLevels?idLevel=${indexLevel}&action=getDataActivity`; 
            const response = await fetch(endpoint, { method: "GET", cache: "reload" });
            const data = await response.json();
        if (response.status === 200) {
            setActivities(data);  
            setSeeIntro("boxIntroDontShow");
            setSeeActivity("boxActivity");
            }
        } catch (error) {
            console.error("Error parsing response:", error);
        }
    }

    function nextActivity() {

        if (currentIndex + 1 < activities.length) {
            setCurrentIndex(currentIndex + 1);
            // setRightAnswer(null); 
        }
        else{
            setLevelStamp("boxLevelStamp")
            setSeeActivity("boxActivityDontShow")
        }   
    }

    function seeDescription(){
        setLevelStamp("boxLevelStampDontShow")
        setAnimalDescription("boxAnimalDescription")
    }

    return (
        <div className="activity">
            {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
            <MenuTop/>
            <div className="boxActivityContent">
                <div className={seeIntro}>
                    <div className="IntroDesc">{props.dataLevel.levelDescription}</div>
                    <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelAnimalPhoto}`} />
                    <button onClick={getActivity}>Começar</button>
                </div>
                <div className={seeActivity}>
                    {currentActivity && 
                        (
                            <>
                                <div className="activityQuestion">{currentActivity.question}</div>
                                <div className="questionsOptions">
                                    {currentActivity.optionA != ''?<div className="Option" onClick={()=> checkAnswer(currentActivity.optionA)}>{currentActivity.optionA}</div>:''}
                                    {currentActivity.optionB != ''?<div className="Option" onClick={()=> checkAnswer(currentActivity.optionB)}>{currentActivity.optionB}</div>:''}
                                    {currentActivity.optionC != ''?<div className="Option" onClick={()=> checkAnswer(currentActivity.optionC)}>{currentActivity.optionC}</div>:''}
                                    {currentActivity.optionD != ''?<div className="Option" onClick={()=> checkAnswer(currentActivity.optionD)}>{currentActivity.optionD}</div>:''}
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={seeLevelStamp}>
                    <div>Parabéns! Você foi muito bem</div>
                    <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelStampPhoto}`} />
                    <div>Você conquistou um selo!</div>
                    <button onClick={seeDescription}>Saiba mais sobre o selo</button>
                </div>
                <div className={seeAnimalDescription}>
                    <div>{props.dataLevel.levelAnimalDesc}</div>
                    <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelStampPhoto}`} />
                    <button onClick={()=>{props.dataLevel.activityComand[0]()}}>concluir nivel</button>
                </div>
            </div> 
        </div>
    )
}
