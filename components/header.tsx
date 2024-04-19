import Image from "next/image";
import logo from "../assets/img/png/+Acessível.png";
import iconMagnifier from "../assets/icons/icon-magnifier.png";
import iconUser from "../assets/icons/icon-user.png";
import iconTheme from "../assets/icons/icon-theme.png";

const Header = () => {
  return (
    <header>
      <div className="grid content">
        <Image src={logo} width={137} height={25} alt="logo +Acessivel" />
        <div className="mid_box">
          <nav>
            <ul>
              <li>
                <a href="#">Campanhas</a>
              </li>
              <li>
                <a href="#">Acessibilidade</a>
              </li>
            </ul>
          </nav>
          <button className="button_search_region">
            Buscar Regiao
            <Image
              src={iconMagnifier}
              width={16}
              height={16}
              alt="Icone de lupa"
            />
          </button>
        </div>
        <div className="border"></div>
        <div className="buttons">
          <button className="button_theme">
            <Image src={iconTheme} width={16} height={16} alt="Icone de tema" />
          </button>
          <button className="button_register">
            <Image
              src={iconUser}
              width={14}
              height={14}
              alt="Icone de usuario"
            />
            Cadastrar
          </button>
          <button className="button_login">
            <Image
              src={iconUser}
              width={14}
              height={14}
              alt="Icone de usuario"
            />
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
