import Image from "next/image";
import logo from "../assets/img/png/desktop/+Acessível.png";
import iconUser from "../assets/icons/icon-user.png";
import iconTheme from "../assets/icons/icon-theme.png";
import useBreakpoints from "../hooks/useBreakpoints";
import Link from "./link";

interface HeaderProps {
  pathname?: string;
}

const Header = ({ pathname }: HeaderProps) => {
  const breakpoint = useBreakpoints();
  return (
    <header>
      <div
        className={pathname === "/" ? "gridProject content" : "gridAlternative"}
      >
        <Link href={"/"}>
          <Image src={logo} width={137} height={25} alt="logo +Acessivel" />
        </Link>
        {pathname === "/" && (
          <>
            <div className="buttons">
              <button className="button_theme">
                <Image
                  src={iconTheme}
                  width={16}
                  height={16}
                  alt="Icone de tema"
                />
              </button>
              <Link href={"/queixante-cadastro"} className="button_register">
                <Image
                  src={iconUser}
                  width={14}
                  height={14}
                  alt="Icone de usuario"
                />
                Cadastrar
              </Link>
              <Link href={"/login"} className="button_login">
                <Image
                  src={iconUser}
                  width={14}
                  height={14}
                  alt="Icone de usuario"
                />
                Entrar
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
