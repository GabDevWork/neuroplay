import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { TypeDataAlerts } from "../../../components/type";
import Alerts from "../../../components/alerts/alerts";

let dataAlerts:TypeDataAlerts ={
  alertType: 0,
  alertText: "",
  alertButtons: [],
  alertsCommans: [],
}

export default function StudantRegisterUser(){

  const [passworStudent, setpasswordStudent] = useState("")
  const [validatedpassword, setvalidatedpasswoord] = useState("")
  const [showAlerts, setshowAlerts] = useState(false)
  const [messagePassword, setMessagePassword] = useState("");
  const [userStudent, setUserStudent] = useState("")
  const [idStudent, setIdStudent] = useState("");
  const router = useRouter()

  useEffect(() => {
        const storedId = localStorage.getItem("id_student");
        if (storedId) {
          setIdStudent(storedId);
        }
  }, []);

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
    else if (userStudent == "null" || userStudent == "NULL" || userStudent == "Null"){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Digite um usuário válido",
        alertButtons: ["Editar"],
        alertsCommans: [()=>{setshowAlerts(false)}]
      }
    }
    else if (passworStudent == "null" || passworStudent == "NULL" || passworStudent == "Null"){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Digite uma senha válida",
        alertButtons: ["Editar"],
        alertsCommans: [()=>{setshowAlerts(false)}]
      }
    }
    else if (passworStudent != validatedpassword){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Senhas não conferem",
        alertButtons: ["Editar"],
        alertsCommans: [()=>{setshowAlerts(false)}]
      }
    }
    else if (passworStudent == "" && validatedpassword == ""){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "Cadastre uma senha",
        alertButtons: ["Editar"],
        alertsCommans: [()=>{setshowAlerts(false)}]
      }
    }
    else if (passworStudent.length < 8){
      setshowAlerts(true)
      dataAlerts = {
        alertType: 1,
        alertText: "A senha deve conter pelo menos 8 caracteres",
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
      const idReq = "4";
      const endpoint = `/api/apiRegisterStudent?idReq=${idReq}&id=${idStudent}&user=${userStudent}&password=${passworStudent}`; 
      const response = await fetch(endpoint, {method: "POST", cache: "reload"})
      if(response.status === 200){
        localStorage.removeItem("id_student");
        setshowAlerts(true)
        dataAlerts = {
          alertType: 1,
          alertText: "Usuário cadastrado com sucesso",
          alertButtons: ["Ok"],
          alertsCommans: [()=>{router.push("/login")}]
        }
      }else if (response.status === 400){
        setshowAlerts(true)
        dataAlerts = {
          alertType: 1,
          alertText: "Usuário indisponivel, escolha outro",
          alertButtons: ["Editar"],
          alertsCommans: [()=>{setshowAlerts(false)}]
        }
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

  return (
    <div className="bodyStudentRegisterUser">
        {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
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
              <input type="password" className="passStudantInput" value={passworStudent} onChange={(evt)=>{const newPassword = evt.target.value;setpasswordStudent(newPassword);checkPasswordMatch(newPassword, validatedpassword);}}></input>
              <h1 className="textStudentPassword">Confirme sua senha:</h1>
              <input type="password" className="confirmPassStudantInput" value={validatedpassword} onChange={(evt)=>{const newConfirmPassword = evt.target.value;setvalidatedpasswoord(newConfirmPassword);checkPasswordMatch(passworStudent, newConfirmPassword);}}></input>
              <div className="MessageValidatedPasswordStudente">
                  <h1 className="textMessageValidatedPasswordStudent" style={{ color: passworStudent !== validatedpassword ? "red" : passworStudent.length < 8 && validatedpassword.length < 8 ? "red" : "green" }}>{messagePassword}</h1>
              </div>
              <button className="buttonUserRegisterStudant" onClick={()=>AuthenticationsAlerts()}>Próximo</button>
            </div>
        </div>
    </div>
  )}