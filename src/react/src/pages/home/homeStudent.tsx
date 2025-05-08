import MenuTop from "../../../components/menuTop"
import Activy from "../../../components/activity/activity"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TypeDataLevel, TypeDataAlerts } from "../../../components/type"
import Alerts from "../../../components/alerts/alerts"

let dataLevel:TypeDataLevel ={
    levelId: 0,
    levelDescription: "",
    levelAnimalDesc: "",
    levelAnimalPhoto: "",
    levelStampPhoto: "",
    activityComand: [],
}

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
  }

const levels = [1,2,3,4,5,6,7]

export default function Home(){

    const [showActivity, setShowActivity] = useState(false);
    const [showAlerts, setshowAlerts] = useState(false);
    const [cardsActivities, setCardsActivities] = useState([0])
    const [currentLevel, setCurrentLevel] = useState(0)

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
            getProgress(storedId);
        }
    }, [showActivity])

    async function getProgress(id: string) {
        try{
            const endpoint = `/api/apiLevels?idStudent=${id}&action=getProgressLevel`; 
            const response = await fetch(endpoint, {method: "GET", cache: "reload"})
            const data = await response.json();
            if(response.status === 200){
                setCurrentLevel(data.levelProgress)
            }
            else{
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 1,
                    alertText: "Erro ao carregar atividade, tente novamente mais tarde",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false)}]
                }
            }
        }catch(error){
        console.error("Error parsing response:", error);
        }
    }

    async function getActivity(indexLevel: number){
        if(indexLevel > currentLevel){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: `Para fazer esse nível, conclua o nível ${currentLevel} primeiro`,
                alertButtons: ["Ok"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }else if (indexLevel < currentLevel){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Você já concluiu esse nível! Deseja faze-lo novamente?",
                alertButtons: ["Procurar outro nível",`Realizar o nível ${indexLevel} novamente`],
                alertsCommans: [()=>{setshowAlerts(false)}, ()=>{seeLastActivitie(indexLevel)}]
            }
        }
        else if (indexLevel == currentLevel){
            try{
                const endpoint = `/api/apiLevels?idLevel=${indexLevel}&action=getDataLevel`; 
                const response = await fetch(endpoint, {method: "GET", cache: "reload"})
                const data = await response.json();
                if(response.status === 200){
                    setShowActivity(true);
                    dataLevel = {
                        levelId: indexLevel,
                        levelDescription: data.lev_description,
                        levelAnimalDesc: data.animal_description,
                        levelAnimalPhoto: data.animal_photo,
                        levelStampPhoto: data.stamp_photo,
                        activityComand: [()=>{setShowActivity(false)}],
                    }
                }
                else{
                    setshowAlerts(true)
                    dataAlerts = {
                        alertType: 1,
                        alertText: "Erro ao carregar atividade, tente novamente mais tarde",
                        alertButtons: ["Ok"],
                        alertsCommans: [()=>{setshowAlerts(false)}]
                    }
                }
            }catch(error){
            console.error("Error parsing response:", error);
            }
        }
    }

    async function seeLastActivitie(indexLevel: number){
        setshowAlerts(false)
        try{
            const endpoint = `/api/apiLevels?idLevel=${indexLevel}&action=getDataLevel`; 
            const response = await fetch(endpoint, {method: "GET", cache: "reload"})
            const data = await response.json();
            if(response.status === 200){
                setShowActivity(true);
                dataLevel = {
                    levelId: indexLevel,
                    levelDescription: data.lev_description,
                    levelAnimalDesc: data.animal_description,
                    levelAnimalPhoto: data.animal_photo,
                    levelStampPhoto: data.stamp_photo,
                    activityComand: [()=>{setShowActivity(false)}],
                }
            }
            else{
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 1,
                    alertText: "Erro ao carregar atividade, tente novamente mais tarde",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false)}]
                }
            }
        }catch(error){
        console.error("Error parsing response:", error);
        }
    }

    return(
        <div className="bodyHome">
            {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
            <div>
                <MenuTop/>
            </div>
            <div className="homeBox">
                {levels.map((i, index)=>(
                    <div className="columActivity" onClick={()=>getActivity(i)}>
                        <div className={`columActivy${index+1}`}>
                            {i == currentLevel ? 
                                <div className={`cardActivity${index+1}`}></div>
                                :
                                <div className={`cardActivity${index+1}`} style={{ opacity: 0.5 }}></div>
                            }
                            <div className={`levelNumber${i}`}>{i}</div>
                        </div>
                    </div>
                ))}
                <div className="nextPage">
                    <Image className="nextPageImage" alt="seta" height={100} width={100} src={"/images/arrow_right.svg"}></Image>
                </div>
            </div>
            {showActivity&& <Activy dataLevel={dataLevel}/>}
        </div>
    )
}