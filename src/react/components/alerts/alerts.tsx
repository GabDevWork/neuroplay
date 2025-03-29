import { TypeDataAlerts } from "../type";
import Image from "next/image";

interface AlertsProps{
    dataAlert: TypeDataAlerts
}

export default function Alerts(props: AlertsProps){

    let imgIcon:string=""

    //1=alert, 2=question, 3=ok, 4=no, 5=danger
    if (props.dataAlert.alertType == 1){
        imgIcon="/images/warning.svg"
    }

    return(
        <div className="bodyAlert">
            <div className="boxAlert">
                <div>
                    <Image alt="" src={imgIcon} width={100} height={100}/>
                </div>
                <div>
                    {props.dataAlert.alertText}
                </div>
                <div className="boxButtonAlerts">
                    {props.dataAlert.alertButtons.map((btn, index)=>(
                        <button key={index} className="buttonAlerts" onClick={()=>{props.dataAlert.alertsCommans[index]()}}>
                            {btn}
                        </button>   
                    ))}
                </div>
            </div>
        </div>
    )
}