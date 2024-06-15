import st from "@/styles/ContainerDashboard.module.css";

interface ContainerDashboardProps {
  children: React.ReactNode;
}

const ContainerDashboard = ({ children }: ContainerDashboardProps) => {
  return <div className={st.container}>{children}</div>;
};

export default ContainerDashboard;
