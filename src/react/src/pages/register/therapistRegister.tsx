import MenuTop from "../../../components/menuTop"
import Image from "next/image"

export default function TherapistRegister(){

  return (
    <div className="bodytherapistRegister">
        <div>
            <MenuTop/>
        </div>
        <div className="registerAreaTherapist">
            <div className="registerTherapistLogo">
                <Image className="registerTherapistLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="registerTherapistBox">
                <div>
                    <h1 className="textNameTherapist">Nome Completo</h1>
                    <input type="text" className="nameTherapistInput"></input>
                </div>
                <div>
                    <h1 className="textEmailTherapist">Email</h1>
                    <input type="text" className="emailTherapistInput"></input>
                </div>
                <div>
                    <h1 className="textUserTherapist">Nome de usuário</h1>
                    <input type="text" className="userTherapistInput"></input>
                </div>
                <div>
                    <h1 className="textTherapistPassword">Senha</h1>
                    <input type="text" className="passwordTherapistInput"></input>
                </div>
                <div>
                    <h1 className="textTherapistPasswordValidated">Senha</h1>
                    <input type="text" className="passwordValidatedTherapistInput"></input>
                </div>
                <button className="buttonRegisterTherapist">Cadastrar</button>
                <h1 className="textHaveAccessTherapist">Possuo cadastro</h1>
            </div>
        </div>
    </div>
  )}