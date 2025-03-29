import MenuTop from "../../../components/menuTop"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export default function StudantDiagnosticRegister(){

  const router = useRouter()
  const [diagnosticSelect, setdiagnosticSelect] = useState("")

  return (
    <div className="bodyStudentDiagnosticRegister">
        <div>
            <MenuTop/>
        </div>
        <div className="registerAreaStudentDiagnostic">
            <div className="registerStudantDiagnosticLogo">
                <Image className="registerStudantDiagnosticLogoImg" alt="logo" height={100} width={100} src={"/images/logo.jpeg"}/>
            </div>
            <div className="registerStudantDiagnosticBox">
              <h1 className="textStudentDiagnostic">Agora informe</h1>
              <h1 className="textStudentDiagnostic2">seu diagnostico:</h1>
              <select className="diagnosticStudantSelect" value={diagnosticSelect} onChange={(evt)=>setdiagnosticSelect(evt.target.value)}>
                <option value="TDAH">TDAH</option>
                <option value="Dislexia">Dislexia</option>
                <option value="TEA">TEA</option>
              </select>
              <h1 className="textStudentAgeHelp">Peça ajuda de seus pais,</h1>
              <h1 className="textStudentAgeHelp2">se necessário</h1>
              <button className="buttonRegisterStudantAge" onClick={()=> router.push("/register/studentRegisterUser")}>Próximo</button>
            </div>
        </div>
    </div>
  )}