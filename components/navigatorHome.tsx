import { dashboardLinks } from "@/data";
import CardNavigator from "./cardNavigator";
import st from "@/styles/NavigatorHome.module.css";

const Navigator = () => {
  return (
    <ul className={st.core}>
      {dashboardLinks.map(({ link, title }, index) => (
        <CardNavigator key={index} link={link} title={title} />
      ))}
    </ul>
  );
};

export default Navigator;
