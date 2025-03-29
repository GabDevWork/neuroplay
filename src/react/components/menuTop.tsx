import Image from "next/image";

export default function MenuTop(){
    return (
      <div className="menuTop">
        <div className="menuBox">
            <div className="textLogo">
                <h1 className="textLogoNeuro">Neuro</h1>
                <h1 className="textLogoPlay">Play</h1>
            </div>
            <div className="BoximageLogo">
                <Image src="/images/logo.jpeg" alt="logo" width={70} height={65} className="logoimg"/>
            </div>
        </div>
      </div>
    );
  }