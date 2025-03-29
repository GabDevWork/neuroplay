import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";


export default function Login(){

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  const LoginUser = async()=>{
    try{
        const endpont = `/api/apiLogin?username=${user}&password=${password}`;
        const response=await fetch(endpont,{method: "GET", cache:"reload"})
        if(response.status === 200){
            router.push("/home")
        }else {
            console.error("Falha no login:", await response.json());
        }
    }catch(error){
        console.log(error)
    }
  }  

 return (
    <div className="bodyLogin">
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
                    <input type="password" className="passwordInput" value={password} onChange={(evt)=>{setPassword(evt.target.value)}}></input>
                </div>
                <button className="buttonEnter" onClick={()=>{LoginUser()}}>Entrar</button>
                <button className="signinGoogle">
                    <Image className="googleIcon" alt="google" height={20} width={20} src={"/images/google_icon.png"}/>
                    Entrar com o Google
                </button>
                <button className="signinFacebook">
                    <Image className="facebookIcon" alt="google" height={20} width={20} src={"/images/facebbok_icon.png"}/>
                    Entrar com o facebook</button>
                <h1 className="textRecoverPass">Esqueceu a senha</h1>
                <h1 className="textFirstAccess" onClick={()=>router.push("/register")}>Primeiro acesso</h1>
            </div>
        </div>
    </div>
  )}