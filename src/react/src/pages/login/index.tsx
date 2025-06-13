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

export default function Login(){

    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const router = useRouter();
    const [showAlerts, setshowAlerts] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const LoginUser = async()=>{
    try{
        const endpont = `/api/apiLogin?username=${user}&password=${password}`;
        const response=await fetch(endpont,{method: "GET", cache:"reload"})
        const data = await response.json();
        if(response.status === 200){
            if (data.role == "Professor" || data.role == "Terapeuta"){
                localStorage.setItem("id", data.id);
                router.push("/home/homeProfessional")
            }else if (data.role == "Estudante"){
                localStorage.setItem("id", data.id);
                router.push("/home/homeStudent")
            }
        }else if (response.status === 401){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Usuario ou senha incorretos",
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

 return (
    <div className="bodyLogin">
        {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
        <div>
            <MenuTop/>
        </div>
        <div className="signInArea">
            <div className="signInAreaLogo">
                <Image className="signInAreaLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="signInBox">
                <div>
                    <h1 className="textUser">Usuário</h1>
                    <input type="text" className="userInput" value={user} onChange={(evt)=>{setUser(evt.target.value)}}></input>
                </div>
                <div>
                    <h1 className="textPassword">Senha</h1>
                    <div className="passwordBox">
                        <input type={showPassword ? "text" : "password"} className="passwordInput" value={password} onChange={(evt)=>{setPassword(evt.target.value)}} onKeyDown={(e) => 
                            {
                                if (e.key === 'Enter') {
                                    LoginUser()
                                }
                            }}>
                        </input>
                        <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                            <Image alt="" className="redefinePasswordImage" height={100} width={100} src={showPassword ? "/images/visibility.svg" : "/images/visibility_off.svg"}/>
                        </span>
                    </div>
                </div>
                <button className="buttonEnter" onClick={()=>{LoginUser()}}>Entrar
                </button>
                <button className="signinGoogle">
                    <Image className="googleIcon" alt="google" height={20} width={20} src={"/images/google_icon.png"}/>
                    Entrar com o Google
                </button>
                <button className="signinFacebook">
                    <Image className="facebookIcon" alt="google" height={20} width={20} src={"/images/facebbok_icon.png"}/>
                    Entrar com o facebook</button>
                <h1 className="textRecoverPass" onClick={()=>router.push("/redefinePassword")}>Esqueceu a senha</h1>
                <h1 className="textFirstAccess" onClick={()=>router.push("/register")}>Primeiro acesso</h1>
            </div>
        </div>
    </div>
  )}