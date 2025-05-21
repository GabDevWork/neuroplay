import MenuTop from "../../../components/Top/menuTop"
import Image from "next/image"
import { useState, useEffect } from "react"
import { TypeDataAlerts } from "../../../components/type"
import Alerts from "../../../components/alerts/alerts"

let dataAlerts:TypeDataAlerts ={
  alertType: 0,
  alertText: "",
  alertButtons: [],
  alertsCommans: [],
}

interface dataStamp{
    progressId: number,
    studentId: number,
    stampId: number,
    aniName: string,
    stampPhoto: string
}

export default function Stamp(){

    const [showAlerts, setshowAlerts] = useState(false)
    const [nameAnimal, setNameAnimal] = useState<string[]>([])
    const [photoStamp, setPhotoStmp] = useState<string[]>([])
    const [stampQtd, setStampQtd] = useState(-1);
    const [numStamps, setNumStamps] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
            getProgressStamp(storedId);
        }
    }, [])

    async function getProgressStamp(idUser: string){
        try{
            const endpoint = `/api/apiProgress?idStudent=${idUser}&action=getProgressStamp`; 
            const response = await fetch(endpoint, {method: "GET", cache: "reload"})
            const data = await response.json();
            setStampQtd(data.length);
            if(response.status === 200){
                let tmp_name:string[] = [""], tmp_photo:string[] = [""]
                let tmp_num = numStamps
                data.map((u:dataStamp, index:number)=>{
                    tmp_name[index] = u.aniName;
                    tmp_photo[index] = u.stampPhoto;
                    tmp_num[index] = u.progressId;
                })
                setPhotoStmp(tmp_photo);
                setNameAnimal(tmp_name);
                setNumStamps(tmp_num);
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
        <div className="bodyStamp">
            {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
            <div>
                <MenuTop menuOptions={true}/>
            </div>
            <div className="medalStamps">
                <div className="circleMedal">
                    <div className="circleMedal1">
                        <Image alt="" className="stampImage" height={100} width={100} src={"/images/stamp.png"}/>
                    </div>
                </div>
                <div className="squareMedal">
                    {`${stampQtd}/15`}
                </div>
            </div>
            <div className="stamp">
                <div className="stampBox">
                    <div className="rowStamp">
                        {numStamps.map((i, index)=>(
                            <div className="stampContent">
                                <div className="stampItem">
                                    {i != 0 ?
                                        <Image alt="" className="stampImage" height={100} width={100} src={`/images/${photoStamp[index]}`}/>
                                        :""
                                    }
                                </div>
                                {nameAnimal[index]}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
