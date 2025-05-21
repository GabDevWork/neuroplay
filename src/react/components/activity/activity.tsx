import Image from "next/image"
import { useState, useEffect } from "react";
import { TypeDataLevel, TypeDataAlerts } from "../type";
import Alerts from "../alerts/alerts";
import MenuTop from "../Top/menuTop";

export interface dataActivity {
    dataLevel: TypeDataLevel,
    comandNextLevel: (indexLevel: number)=>{}
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
    const [seeLevelConclusion, setSeeLevelConclusion] = useState("boxLevelConclusionDontShow")
    let currentActivity = activities[currentIndex];
    const [showAlerts, setshowAlerts] = useState(false);
    const now =  Date.now()

    useEffect(() => {
        if (props.dataLevel) {
            setActivities([]);
            setCurrentIndex(0);
        }
    }, [props.dataLevel]);

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
        console.log(props.dataLevel.levelId)
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
            if(props.dataLevel.levelRepeat === false){
                setLevelStamp("boxLevelStamp")
                setSeeActivity("boxActivityDontShow")
            }
            else{
                setSeeLevelConclusion("boxLevelConclusion")
                setSeeActivity("boxActivityDontShow")
            }
        }   
    }

    const editDate=()=>{
        const date = new Date(now);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function saveProgress(){
        const date = editDate();
        const idLevel = props.dataLevel.levelId + 1;
        try {
            const endpoint = `/api/apiProgress?idStudent=${props.dataLevel.levelStudentId}&idLevel=${idLevel}&date=${date}&action=savePogressStudent`; 
            const response = await fetch(endpoint, { method: "POST", cache: "reload" });
            const data = await response.json();
        } catch (error) {
            console.error("Error parsing response:", error);
        }
    }

    function seeDescription(){
        setLevelStamp("boxLevelStampDontShow")
        setAnimalDescription("boxAnimalDescription")
    }

    return (
        <div className="activity">
            {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
                <MenuTop menuOptions={false}/>
            <div className="boxActivityContent">
                    <Image className="closeActivity" alt="Sair" height={100} width={100} src={"/images/close.svg"} onClick={()=>{props.dataLevel.activityComand[0]()}}/>
                <div className={seeIntro}>
                    <div className="IntroDesc">
                        <h1 className="introDescText">{props.dataLevel.levelDescription}</h1>
                    </div>
                    <div className="IntroAnimalPhoto">
                        <Image className="IntroAnimalPhoto_Img" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelAnimalPhoto}`} />
                    </div>
                    <button className="buttonIntro" onClick={getActivity}>Começar</button>
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
                {props.dataLevel.levelRepeat == false ?
                    <>
                        <div className={seeLevelStamp}>
                            <div>Parabéns! Você foi muito bem</div>
                            <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelStampPhoto}`} />
                            <div>Você conquistou um selo!</div>
                            <button onClick={seeDescription}>Saiba mais sobre o selo</button>
                        </div>
                        <div className={seeAnimalDescription}>
                            <div>{props.dataLevel.levelAnimalDesc}</div>
                            <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelStampPhoto}`} />
                            <button onClick={()=>{saveProgress(), setAnimalDescription("boxAnimalDescriptionDontShow"),setSeeLevelConclusion("boxLevelConclusion")}}>concluir nivel</button>
                        </div>
                        <div className={seeLevelConclusion}>
                            a
                            <button onClick={()=>{props.dataLevel.activityComand[0](), props.comandNextLevel(props.dataLevel.levelId+1), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Próxima ativiade</button>
                            <button onClick={()=>{props.dataLevel.activityComand[0](), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Ir para o caminho de níveis</button>
                        </div>
                    </>:
                    <>
                        <div className={seeLevelConclusion}>
                            a
                            <button onClick={()=>{props.dataLevel.activityComand[0](), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Ir para o caminho de níveis</button>
                        </div>
                    </>
                }
            </div> 
        </div>
    )
}
