import MenuTop from "../../../components/Top/menuTop"
import Image from "next/image"
// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { TypeDataAlerts } from "../../../components/type";
import Alerts from "../../../components/alerts/alerts";

let dataAlerts:TypeDataAlerts ={
    alertType: 0,
    alertText: "",
    alertButtons: [],
    alertsCommans: [],
  }

export default function ProfileProf(){ 

    const [showAlerts, setshowAlerts] = useState(false);
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const [messagePassword, setMessagePassword] = useState("");
    const [messageEmail, setMessageEmail] = useState("");

    const [editInfo, setEditInfo] = useState(false);
    const [profId, setProfId] = useState(0);
    const [nameProfissional, setNameProfissional] = useState("");
    const [userProfessional, setUserProfessional] = useState("");
    const [emailProfessional, setemailProfessional] = useState("");
    const [professional, setProfessional] = useState("");
    const [passwordProfessional, setPasswordProfessional] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const [editNameProfissional, setEditNameProfissional] = useState("");
    const [editUserProfessional, setEditUserProfessional] = useState("");
    const [editEmailProfessional, setEditEmailProfessional] = useState("");
    const [editProfessional, setEditProfessional] = useState("");
    const [editPasswordProfessional, setEditPasswordProfessional] = useState("");
    const [otherProfessional, setOtherProfessional] = useState("")

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        if (storedId) {
            getDataProfessional(storedId)
        }
    }, [showAlerts])

    async function getDataProfessional(idProf: string){
        try{
            const endpoint = `/api/apiProfileProf?idProfessional=${idProf}&action=getDataProfessional`; 
            const response = await fetch(endpoint, {method: "GET", cache: "reload"})
            const data = await response.json();
            if(response.status === 200){
                setNameProfissional(data.prof_name)
                setEditNameProfissional(data.prof_name)
                setUserProfessional(data.prof_user)
                setEditUserProfessional(data.prof_user)
                setemailProfessional(data.prof_email)
                setEditEmailProfessional(data.prof_email)
                setProfessional(data.prof_desc)
                setEditProfessional(data.prof_desc)
                setProfId(data.prof_id)
                setPasswordProfessional(data.prof_password)
                setEditPasswordProfessional(data.prof_password)
                if(data.prof_desc == "Professor"){
                    setOtherProfessional("Terapeuta")
                }else if(data.prof_desc == "Terapeuta"){
                    setOtherProfessional("Professor")
                }
            }
            else{
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 5,
                    alertText: "Erro ao carregar dados, tente novamente mais tarde",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false)}]
                }
            }
        }catch(error){
            console.error("Error parsing response:", error);
        }
    } 

    const checkPasswordMatch = (password: string) => {
        if (password.length < 8) {
            setMessagePassword("❌ Digite pelo menos 8 caracteres!");
        }else{
            setMessagePassword("✔ Senha válida")
        } 
    };

    const checkEmail = (email: string)=> {
        if (regEx.test(email)){
            setMessageEmail("✔ E-mail válido")
        }else{
            setMessageEmail("❌ E-mail inválido")
        }
    }

    function AuthenticationsAlerts(){
        if (editNameProfissional == "" || editNameProfissional == "null" || editNameProfissional == "NULL" || editNameProfissional == "Null"){
            setEditNameProfissional(nameProfissional)
            setshowAlerts(true)
            dataAlerts = {
                alertType: 5,
                alertText: "Insira um valor válido para o nome",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false), setEditInfo(false)}]
            }
        }
        else if (regEx.test(editEmailProfessional) == false || editEmailProfessional == "null" || editEmailProfessional == "NULL" || editEmailProfessional == "Null"){
            setEditEmailProfessional(emailProfessional)
            setshowAlerts(true)
            dataAlerts = {
                alertType: 2,
                alertText: "Adicione um e-mail válido",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
        else if (editUserProfessional == "" || editUserProfessional == "null" || editUserProfessional == "NULL" || editUserProfessional == "Null"){
            setEditUserProfessional(userProfessional)
            setshowAlerts(true)
            dataAlerts = {
                alertType: 5,
                alertText: "Insira um valor válido para o Usuário",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false), setEditInfo(false)}]
            }
        }
        else if (editPasswordProfessional == ""){
            setEditPasswordProfessional(passwordProfessional);
            setshowAlerts(true)
            dataAlerts = {
                alertType: 2,
                alertText: "Cadastre uma senha",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
        else if (editPasswordProfessional.length < 8){
            setEditPasswordProfessional(passwordProfessional);
            setshowAlerts(true)
            dataAlerts = {
                alertType: 2,
                alertText: "A senha deve conter pelo menos 8 caracteres",
                alertButtons: ["Editar"],
                alertsCommans: [()=>{setshowAlerts(false)}]
            }
        }
        else{
            saveDataProfessional(profId)
        }
    }

    async function saveDataProfessional(idProf: number){
        try{
            const endpoint = `/api/apiProfileProf?idProfessional=${idProf}&userProfissional=${editUserProfessional}&emailProfissional=${editEmailProfessional}&passwordProfessional=${editPasswordProfessional}&action=saveDataProfessional`; 
            const response = await fetch(endpoint, {method: "POST", cache: "reload"})
            const data = await response.json();
            if(response.status === 200){
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 3,
                    alertText: "Dados salvos com sucesso!",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false), setEditInfo(false)}]
                }
            }
            else{
                setshowAlerts(true)
                dataAlerts = {
                    alertType: 5,
                    alertText: "Erro ao salvar dados, tente novamente mais tarde",
                    alertButtons: ["Ok"],
                    alertsCommans: [()=>{setshowAlerts(false), setEditInfo(false)}]
                }
            }
        }catch(error){
            console.error("Error parsing response:", error);
        }
    }

 return (
    <div className="bodyProfileProf">
        {showAlerts&& <Alerts dataAlert={dataAlerts}/>}
        <div>
            <MenuTop perfilProf={true} perfilStud={false}/>
        </div>
        <div className="profileProfArea">
            <div className="profileProfBox">
                <div className="profileProfImg">
                    {editInfo == false ? 
                        <Image className="professionalImg" alt='' height={100} width={100} src={'/images/account_circle.svg'}/>: 
                        <Image className="professionalImg" alt='' height={100} width={100} src={'/images/account_circle.svg'}/>
                    }
                </div>
                <div className="profileProfContent">
                    <div className="profileProfDesc">
                        <h1>Profissão:</h1>
                        <h1>{professional}</h1>
                    </div>
                </div>
                <div className="profileProfContent">
                    <div className="profileProfDesc">
                        <h1>Nome:</h1>
                        <h1>{nameProfissional}</h1>
                    </div>
                </div>
                <div className="profileProfContent">
                    <div className="profileProfDesc">
                        <h1>E-mail:</h1>
                        {editInfo == false ?
                            <h1>{emailProfessional}</h1>:
                            <input className="profileProfessionalInput" placeholder={emailProfessional} value={editEmailProfessional} onChange={(evt)=>{setEditEmailProfessional(evt.target.value),checkEmail(evt.target.value)}}></input>
                        }
                    </div>
                    {editInfo == true ? <h1 className="ValidatedEmailTeacher" style={{ color: messageEmail === "❌ E-mail inválido" ? "red" : "green" }}>{messageEmail}</h1>:""}
                </div>
                <div className="profileProfContent">
                    <div className="profileProfDesc">
                        <h1>Usuário:</h1>
                        {editInfo == false ? 
                            <h1>{userProfessional}</h1>: 
                            <input className="profileProfessionalInput" placeholder={userProfessional} value={editUserProfessional} onChange={(evt)=>{setEditUserProfessional(evt.target.value)}}></input>
                        }
                    </div>
                </div>
                <div className="profileProfContent">
                    <div className="profileProfDesc">
                        <h1>Senha:</h1>
                        {editInfo == false ? 
                            <h1>********</h1>: 
                            <input type={hidePassword ? "password" : "text"} className="profileProfessionalInput" placeholder={passwordProfessional} value={editPasswordProfessional} onChange={(evt)=>{setEditPasswordProfessional(evt.target.value),checkPasswordMatch(evt.target.value)}}></input>
                        }
                        {editInfo == true ? 
                            <span onClick={() => setHidePassword(!hidePassword)} style={{ cursor: "pointer" }}>
                                <Image alt="" className="redefinePasswordImage" height={100} width={100} src={hidePassword ? "/images/visibility_off.svg" : "/images/visibility.svg"}/>
                            </span>:""
                        }
                    </div>
                    {editInfo == true ? <h1 className="textMessageValidatedPasswordTeacher" style={{ color: editPasswordProfessional.length < 8 ? "red" : "green" }}>{messagePassword}</h1>:""}
                </div>
                <div className="profileProfButtonBox">
                    {editInfo == false ? 
                        <button onClick={()=>setEditInfo(true)} className="profileProfButton">Editar informações</button>:
                        <button onClick={()=>{setEditInfo(false), AuthenticationsAlerts(), setHidePassword(true)}} className="profileProfButton">Salvar</button>
                    }
                </div>
            </div>
        </div>
    </div>
  )}