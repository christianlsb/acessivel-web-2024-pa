import { useState } from "react";
import st from "@/styles/Tabs.module.css";
import cn from "classnames";

type Tab = {
  title?: string | JSX.Element;
  content?: JSX.Element;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className={st.container}>
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={cn(activeTab === index ? "active" : "", st.tab)}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
        <div className={st.contentTab}>{tabs[activeTab].content}</div>
      </div>
    </>
  );
};

export default Tabs;
