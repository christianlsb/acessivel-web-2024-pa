import Image from "next/image";
import logo from "@/assets/img/png/desktop/+Acessível.png";
const Footer = () => {
  return (
    <footer className="section_container">
      <div className="grid">
        <div className="container_image">
          <Image src={logo} width={137} height={25} alt="Logo +Acessivel" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
