import React from 'react';
import { LineChart, BarChart } from "@/components/index"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="chart-container">
                <h2>Gráfico de Linha</h2>
                <LineChart />
            </div>
            <div className="chart-container">
                <h2>Gráfico de Barras</h2>
                <BarChart />
            </div>
        </div>
    );
};

export default Dashboard;
