import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import st from "@/styles/Sidebar.module.css";
import Link from "./link";

const Sidebar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <div className={st.container}>
      <div className={st.content}>
        <nav>
          <ul>
            <li>
              <Link
                href={"/home"}
                className={activeLink === "/home" ? st.active : ""}
              >
                Principal
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard"}
                className={activeLink === "/dashboard" ? st.active : ""}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={"/solicitacoes"}
                className={activeLink === "/solicitacoes" ? st.active : ""}
              >
                Solicitações
              </Link>
            </li>
            <li>
              <Link
                href={"/perfil"}
                className={activeLink === "/perfil" ? st.active : ""}
              >
                Dados Pessoais
              </Link>
            </li>
            <li>
              <Link
                href={"/fale-conosco"}
                className={activeLink === "/fale-conosco" ? st.active : ""}
              >
                Fale conosco
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
