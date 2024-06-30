import React from 'react';
import dynamic from 'next/dynamic'; // Importa dynamic do Next.js para carregamento dinâmico

// Carrega dinamicamente o componente ReactApexChart apenas no navegador
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = ({ data }) => {
    const series = [{
        name: 'Sales',
        data: data || [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
    };

    return (
        <ReactApexChart options={options} series={series} type="line" height={350} />
    );
};

export default LineChart;
