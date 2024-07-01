import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import st from "@/styles/Sidebar.module.css";
import Link from "./link";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [getUserGoverno, setUserGoverno] = useState<any>({});
  const [getUserQueixante, setUserQueixante] = useState<any>({});

  const { user } = JSON.parse(Cookies.get("user") || "{}");

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const getUserDataGoverno = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/governo/get/${user.id_governo}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setUserGoverno(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDataGoverno();
  }, []);

  const getUserDataQueixante = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:2424/queixante/get/${user.id_queixante}`
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados do usuário");
      }
      const data = await response.json();
      setUserQueixante(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDataQueixante();
  }, []);

  return (
    <div className={st.container}>
      <div className={st.content}>
        <nav>
          <ul className={st.list}>
            <li>
              <Link
                href="/dashboard/home"
                active={activeLink === "/dashboard/home"}
              >
                Principal
              </Link>
            </li>
            {getUserGoverno.idGoverno && (
              <li>
                <Link
                  href="/dashboard/gov/relatorios"
                  active={activeLink === "/dashboard/gov/relatorios"}
                >
                  Relatórios
                </Link>
              </li>
            )}
            {getUserQueixante.idQueixante && (
              <li>
                <Link
                  href="/dashboard/relatorios"
                  active={activeLink === "/dashboard/relatorios"}
                >
                  Relatórios
                </Link>
              </li>
            )}
            {getUserQueixante.idQueixante && (
              <li>
                <Link
                  href="/dashboard/solicitacoes"
                  active={activeLink === "/dashboard/solicitacoes"}
                >
                  Solicitações
                </Link>
              </li>
            )}
            {getUserQueixante.idQueixante && (
              <li>
                <Link
                  href="/dashboard/perfil"
                  active={activeLink === "/dashboard/perfil"}
                >
                  Dados Pessoais
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <button onClick={logout} className={st.logout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
