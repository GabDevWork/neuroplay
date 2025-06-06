import MenuTop from "../../../components/Top/menuTop"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { TypeDataAlerts } from "../../../components/type";
import Alerts from "../../../components/alerts/alerts";

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
  }

export default function RedefinePassword(){

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [userVerificated, setUserVerificated] = useState(false);
  const router = useRouter();
  const [showAlerts, setshowAlerts] = useState(false);

  const verifyUser = async()=>{
    try{
        const endpont = `/api/apiRedefinePassword?username=${user}`;
        const response=await fetch(endpont,{method: "GET", cache:"reload"})
        const data = await response.json();
        if(response.status === 200){
            setUserVerificated(true);
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Agora defina uma senha com pelo menos 8 caracteres",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }else if (response.status === 401){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Usuario não existe",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }else{
            setshowAlerts(true)
            dataAlerts = {
                alertType: 5,
                alertText: "Erro inesperado no servidor, tente novamente mais tarde",
                alertButtons: ["Ok"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
    }catch(error){
        console.log(error)
    }
  }  

    const redefinePassword = async()=>{
    try{
        const endpont = `/api/apiRedefinePassword?username=${user}&password=${password}`;
        const response=await fetch(endpont,{method: "POST", cache:"reload"})
        const data = await response.json();
        if(response.status === 200){
            
        }else{
            setshowAlerts(true)
            dataAlerts = {
                alertType: 5,
                alertText: "Erro inesperado no servidor, tente novamente mais tarde",
                alertButtons: ["Ok"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
    }catch(error){
        console.log(error)
    }
  } 

 return (
    <div className="bodyRedefinePassword">
        {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
        <div>
            <MenuTop menuOptions={false}/>
        </div>
        <div className="redefinePasswordArea">
            <div className="redefinePasswordLogo">
                <Image className="redefinePasswordLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="redefinePasswordBox">
                <div>
                    <h1 className="redefinePassTextDesc">Por favor, insira seu usuário para redefinição da senha:</h1>
                    <h1 className="redefinePassTextUser">Usuário</h1>
                    <input type="text" className="redefinePassInput" value={user} onChange={(evt)=>{setUser(evt.target.value)}}onKeyDown={(e) => 
                        {
                            if (e.key === 'Enter') {
                                verifyUser()
                            }
                        }}>
                    </input>
                </div>
                {userVerificated == false ? <button className="buttonRedefinePassword_User" onClick={verifyUser}>Verificar usuário</button>:""}
                {userVerificated && 
                    <div className="redefinePasswordBoxPassContent">
                        <div className="redefinePasswordBoxPass">
                            <h1 className="textRedefinePassword">Senha</h1>
                            <input type="password" className="redefinePasswordInput" value={password} onChange={(evt)=>{setPassword(evt.target.value)}} onKeyDown={(e) => 
                                {
                                    if (e.key === 'Enter') {
                                        redefinePassword()
                                    }
                                }}>
                            </input>
                        </div>
                        <button className="buttonRedefinePassword" onClick={redefinePassword}>Redefinir senha</button>
                    </div>
                }
                <div className="buttonRedefinePassLogin">
                    Lembrei minha senha
                </div>
            </div>
        </div> 
    </div>
  )}