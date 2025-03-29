import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router"

export default function StudantAgeRegister(){

  const router = useRouter()

  return (
    <div className="bodyStudentAgeRegister">
        <div>
            <MenuTop/>
        </div>
        <div className="registerAreaStudentAge">
            <div className="registerStudantAgeLogo">
                <Image className="registerStudantAgeLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="registerStudantAgeBox">
              <h1 className="textStudentAge">Agora digite sua idade:</h1>
              <input type="text" className="ageStudantInput"></input>
              <h1 className="textStudentAgeHelp">Peça ajuda de seus pais,</h1>
              <h1 className="textStudentAgeHelp2">se necessário</h1>
              <button className="buttonRegisterStudantAge" onClick={()=> router.push("/register/studentRegisterDiagnostic")}>Próximo</button>
            </div>
        </div>
    </div>
  )}