import st from "@/styles/ContainerDashboard.module.css";

interface ContainerDashboardProps {
  children: React.ReactNode;
  title: string;
}

const ContainerDashboard = ({ children, title }: ContainerDashboardProps) => {
  return (
    <div className={st.container}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default ContainerDashboard;
