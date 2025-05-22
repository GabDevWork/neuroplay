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
    const [seeAnimalDescription, setAnimalDescription] = useState("boxAnimalDescriptionDontShow");
    const [seeLevelConclusion, setSeeLevelConclusion] = useState("boxLevelConclusionDontShow");
    const [seeCloseActivity, setSeeCloseActivity] = useState("closeActivity");
    const [wrongActivitys, setWrongActivityes] = useState(0);
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
                alertType: 3,
                alertText: "Muito bem, a esposta está correta!",
                alertButtons: ["Proxima pergunta"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
            nextActivity()
        }
        else{
            let tmp_wrongActivitys = wrongActivitys
            tmp_wrongActivitys = tmp_wrongActivitys+1
            setWrongActivityes(tmp_wrongActivitys)
            setshowAlerts(true)
            dataAlerts = {
                alertType: 4,
                alertText: `Resposta incorreta, a resposta correta é: ${currentActivity.answer}`,
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
        }
        else{
            confirmPerformance()
        }   
    }

    function confirmPerformance(){
        if (wrongActivitys >= 2){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 4,
                alertText: `burro!`,
                alertButtons: ["começar do inicio"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }else{
            if(props.dataLevel.levelRepeat === false){
                setLevelStamp("boxLevelStamp")
                setSeeActivity("boxActivityDontShow")
                setSeeCloseActivity("closeActivityDontShow")
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
                <button className={seeCloseActivity} onClick={()=>{props.dataLevel.activityComand[0]()}}>Fechar atividade</button>
                <div className={seeIntro}>
                    <div className="IntroDesc">
                        <h1 className="introDescText">{props.dataLevel.levelDescription}</h1>
                    </div>
                    <div className="IntroDesc">
                        <h1 className="introDescText">Escute o seu som:</h1>
                        <Image className="introDescAudio" alt="Animal" height={100} width={100} src="/images/volume_up.svg"/>
                    </div>
                    <button className="buttonIntro" onClick={getActivity}>Começar</button>
                </div>
                <div className={seeActivity}>
                    {currentActivity && 
                        (
                            <>
                                <div className="activityQuestion"><h1 className="activityQuestionText">{currentActivity.question}</h1></div>
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
                            <button className="" onClick={seeDescription}>Saiba mais sobre o selo</button>
                        </div>
                        <div className={seeAnimalDescription}>
                            <div>{props.dataLevel.levelAnimalDesc}</div>
                            <Image className="IntroAnimalPhoto" alt="Animal" height={100} width={100} src={`/images/${props.dataLevel.levelStampPhoto}`} />
                            <button onClick={()=>{saveProgress(), setAnimalDescription("boxAnimalDescriptionDontShow"),setSeeLevelConclusion("boxLevelConclusion")}}>concluir nivel</button>
                        </div>
                        <div className={seeLevelConclusion}>
                            <div>Ver selos</div>
                            <div>
                                <h1>você completou</h1>
                                <h1>{`/10`}</h1>
                            </div>
                            <button onClick={()=>{props.dataLevel.activityComand[0](), props.comandNextLevel(props.dataLevel.levelId+1), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Próxima ativiade</button>
                            <button onClick={()=>{props.dataLevel.activityComand[0](), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Ir para o caminho de níveis</button>
                        </div>
                    </>:
                    <>
                        <div className={seeLevelConclusion}>
                            <div>Ver selos</div>
                            <button onClick={()=>{props.dataLevel.activityComand[0](), setSeeLevelConclusion("boxLevelConclusionDontShow")}}>Ir para o caminho de níveis</button>
                        </div>
                    </>
                }
            </div> 
        </div>
    )
}
