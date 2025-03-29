import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import Alerts from "../../../components/alerts/alerts";
import { TypeDataAlerts } from "../../../components/type";

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
}

export default function TeacherRegister(){

  const router = useRouter()
  const [nameTeacher, setNameTeacher] = useState("")
  const [emailTeacher, setEmailTeacher] = useState("")
  const [userTeacher, setUserTeacher] = useState("")
  const [passwordTeacher, setpasswordTeacher] = useState("")
  const [validatedpassword, setvalidatedpasswoord] = useState("")
  const [showAlerts, setshowAlerts] = useState(false)
  const [messagePassword, setMessagePassword] = useState("");


  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    if (password.length < 8 && confirmPassword.length < 8) {
        setMessagePassword("❌ Digite pelo menos 8 caracteres!");
    } else if (password === confirmPassword && password !== ""){
        setMessagePassword("✔ Senhas conferem!");
    }    
    else {
        setMessagePassword("❌ As senhas não conferem!");
    }
  };

  function AuthenticationsAlerts(){
    if (passwordTeacher != validatedpassword){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "Senhas não conferem",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else if (nameTeacher == ""){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "Adicione o seu nome completo",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else if (emailTeacher == ""){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "Adicione um e-mail válido",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else if (userTeacher == ""){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "Adicione um usuário válido",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else if (passwordTeacher == "" && validatedpassword == ""){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "Cadastre uma senha",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else if (passwordTeacher.length < 8){
        setshowAlerts(true)
        dataAlerts = {
            alertType: 1,
            alertText: "A senha deve conter pelo menos 8 caracteres",
            alertButtons: ["Editar"],
            alertsCommans: [()=>{setshowAlerts(false)}]
        }
    }
    else{
        registerTeacher();
    }
  }

  const registerTeacher = async () => {
    try{
        const descricao = "Professor"
        const endpoint = `/api/apiRegisterProfessional?nome=${nameTeacher}&descricao=${descricao}&email=${emailTeacher}&username=${userTeacher}&password=${passwordTeacher}`; 
        const response = await fetch(endpoint, {method: "POST", cache: "reload"})
        if(response.status === 200){
            setshowAlerts(true)
            dataAlerts = {
                alertType: 1,
                alertText: "Cadastro concluido",
                alertButtons: ["Ok"],
                alertsCommans: [()=>{router.push("/login")}]
            }
        }
    } catch (error){
        console.error("Error parsing response:", error);
    }
  }

  return (
    <div className="bodyTeacherRegister">
        {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
        <div>
            <MenuTop/>
        </div>
        <div className="registerAreaTeacher">
            <div className="registerTeacherLogo">
                <Image className="registerTeacherLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="registerTherapistBox">
                <div>
                    <h1 className="textNameTeacher">Nome Completo</h1>
                    <input type="text" className="nameTeacherInput" value={nameTeacher} onChange={(evt)=>{setNameTeacher(evt.target.value)}}></input>
                </div>
                <div>
                    <h1 className="textEmailTeacher">Email</h1>
                    <input type="text" className="emailTeacherInput" value={emailTeacher} onChange={(evt)=>{setEmailTeacher(evt.target.value)}}></input>
                </div>
                <div>
                    <h1 className="textUserTeacher">Nome de usuário</h1>
                    <input type="text" className="userTeacherInput"value={userTeacher} onChange={(evt)=>{setUserTeacher(evt.target.value)}}></input>
                </div>
                <div>
                    <h1 className="textTeacherPassword">Senha</h1>
                    <input type="password" className="passwordTeacherInput" value={passwordTeacher} onChange={(evt)=>{const newPassword = evt.target.value;setpasswordTeacher(newPassword);checkPasswordMatch(newPassword, validatedpassword);}}></input>
                </div>
                <div>
                    <h1 className="textTeacherPasswordValidated">Confirme sua senha</h1>
                    <input type="password" className="passwordValidatedTeacherInput" value={validatedpassword} onChange={(evt)=>{const newConfirmPassword = evt.target.value;setvalidatedpasswoord(newConfirmPassword);checkPasswordMatch(passwordTeacher, newConfirmPassword);}}></input>
                </div>
                <div className="MessageValidatedPasswordTeacher">
                    <h1 className="textMessageValidatedPasswordTeacher" style={{ color: passwordTeacher !== validatedpassword ? "red" : passwordTeacher.length < 8 && validatedpassword.length < 8 ? "red" : "green" }}>{messagePassword}</h1>
                </div>
                <button className="buttonRegisterTeacher" onClick={()=>AuthenticationsAlerts()}>Cadastrar</button>
                <h1 className="textHaveAccessTeacher" onClick={()=>router.push("/login")}>Possuo cadastro</h1>
            </div>
        </div>
    </div>
  )}