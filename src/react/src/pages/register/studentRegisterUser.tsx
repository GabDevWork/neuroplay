import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { TypeDataAlerts } from "../../../components/type";

let dataAlerts:TypeDataAlerts ={
  alertType: 0,
  alertText: "",
  alertButtons: [],
  alertsCommans: [],
}

export default function StudantRegisterUser(){

  const [passwordTeacher, setpasswordTeacher] = useState("")
  const [validatedpassword, setvalidatedpasswoord] = useState("")
  const [showAlerts, setshowAlerts] = useState(false)
  const [messagePassword, setMessagePassword] = useState("");
  const [userStudent, setUserStudent] = useState("")
  const router = useRouter()

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
    if (userStudent == ""){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Adicione um usuário",
        alertButtons: ["Editar"],
        alertsCommans: [()=>{setshowAlerts(false)}]
      }
    }
    else if (passwordTeacher != validatedpassword){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Senhas não conferem",
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
        // registerTeacher();
    }
  }

  return (
    <div className="bodyStudentRegisterUser">
        <div>
            <MenuTop/>
        </div>
        <div className="registerUserAreaStudent">
            <div className="registerUserStudantLogo">
                <Image className="registerUserStudantLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="registerUserStudantBox">
              <h1 className="textRegisterUserStudent">Agora informe um</h1>
              <h1 className="textRegisterPassStudent">usuário e senha:</h1>
              <h1 className="textStudentUser">Digite seu usuário:</h1>
              <input type="text" className="userStudantInput" value={userStudent} onChange={(evt)=>{setUserStudent(evt.target.value)}}></input>
              <h1 className="textStudentPassword">Digite sua senha:</h1>
              <input type="password" className="passStudantInput" value={passwordTeacher} onChange={(evt)=>{const newPassword = evt.target.value;setpasswordTeacher(newPassword);checkPasswordMatch(newPassword, validatedpassword);}}></input>
              <h1 className="textStudentPassword">Confirme sua senha:</h1>
              <input type="password" className="confirmPassStudantInput" value={validatedpassword} onChange={(evt)=>{const newConfirmPassword = evt.target.value;setvalidatedpasswoord(newConfirmPassword);checkPasswordMatch(passwordTeacher, newConfirmPassword);}}></input>
              <div className="MessageValidatedPasswordStudente">
                  <h1 className="textMessageValidatedPasswordStudent" style={{ color: passwordTeacher !== validatedpassword ? "red" : passwordTeacher.length < 8 && validatedpassword.length < 8 ? "red" : "green" }}>{messagePassword}</h1>
              </div>
              <button className="buttonUserRegisterStudant" onClick={()=>AuthenticationsAlerts()}>Próximo</button>
            </div>
        </div>
    </div>
  )}