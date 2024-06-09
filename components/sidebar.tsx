import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import st from "@/styles/Sidebar.module.css";
import Link from "./link";
import { dashboardLinks } from "@/data";

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
            {dashboardLinks.map(({ link, title }, index) => (
              <li key={index}>
                <Link
                  href={link}
                  className={activeLink === link ? st.active : ""}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
