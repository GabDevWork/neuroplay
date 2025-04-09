import MenuTop from "../../../components/menuTop"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Alerts from "../../../components/alerts/alerts";
import { TypeDataAlerts } from "../../../components/type";
import Image from "next/image";

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
  }

export default function ChildRegister(){

    const router = useRouter()
    const [idProfessional, setIdProfessional] = useState("");
    const [childName, setChildName] = useState("");
    const [childAge, setChildAge] = useState("");
    const [childDiagnostic, setChildDiagnostic] = useState("");
    const [showAlerts, setshowAlerts] = useState(false);

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
            setIdProfessional(storedId);
        }
    }, []);

    function AuthenticationsAlerts(){
        if (childName == "" || childName == "null" || childName == "NULL" || childName == "Null"){
          setshowAlerts(true)
          dataAlerts = {
            alertType: 1,
            alertText: "Adicione um nome",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
          }
        }
        else if (parseInt(childAge) == 0 || parseInt(childAge) >= 20){
          setshowAlerts(true)
          dataAlerts = {
            alertType: 1,
            alertText: "Digite uma idade válida",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
          }
        }
        else if (childDiagnostic == ""){
            setshowAlerts(true)
            dataAlerts = {
              alertType: 1,
              alertText: "Adicione um diagnostico",
              alertButtons: ["Editar"],
              alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
        else{
            RegisterUserStudent();
        }
    }

    const RegisterUserStudent = async () => {
        try{
            const idReq = "5";
            const endpoint = `/api/apiRegisterStudent?idReq=${idReq}&idProfessional=${idProfessional}&nameChild=${childName}&ageChild=${childAge}&diagnosticChild=${childDiagnostic}`; 
            const response = await fetch(endpoint, {method: "POST", cache: "reload"})
            if(response.status === 200){
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 1,
                    alertText: `${childName} Cadastrado(a) com sucesso`,
                    alertButtons: ["Login", "Cadastrar mais crianças"],
                    alertsCommans: [()=>{router.push("/login")}, ()=>{setshowAlerts(false)}]
                }
                localStorage.removeItem("id");
            }
            else{
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 1,
                    alertText: "Cadastro não concluido, tente novamente mais tarde",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false)}]
                }
            }
        }catch(error){
            console.error("Error parsing response:", error);
        }
    }

    return(
        <div className="bodyChildRegister">
            {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
            <div>
                <MenuTop/>
            </div>
            <div className="registerChildArea">
                <div className="registerChildLogo">
                    <Image className="registerChildLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
                </div>
                <div className="registerChildBox">
                    <div>
                        <h1 className="textNameChild">Nome Completo</h1>
                        <input type="text" className="nameChildInput" value={childName} onChange={(evt)=>{setChildName(evt.target.value)}}></input>
                    </div>
                    <div>
                        <h1 className="textChildAge">Idade</h1>
                        <input type="number" className="ageChildInput" value={childAge} onChange={(evt)=>setChildAge(evt.target.value)}></input>
                    </div>
                    <div>
                        <h1 className="textChildDiagnostic">Diagnostico</h1>
                        <select className="diagnosticChildSelect" value={childDiagnostic} onChange={(evt)=>setChildDiagnostic(evt.target.value)}>
                            <option value="">Selecione</option>
                            <option value="TDAH">TDAH</option>
                            <option value="Dislexia">Dislexia</option>
                            <option value="TEA">TEA</option>
                            <option value="Outro">Outros</option>
                        </select>
                    </div>
                    <button className="buttonRegisterChild" onClick={()=>AuthenticationsAlerts()}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}