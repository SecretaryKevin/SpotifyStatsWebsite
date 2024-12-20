// src/components/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { getUniqueColors } from '../colors';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
    title: string;
    name: string;
    data: { [key: string]: number };
}

const PieChart: React.FC<PieChartProps> = ({ title, name, data }) => {
    const colorCount = Object.keys(data).length;
    const colors = colorCount <= 32 ? getUniqueColors(colorCount) : getUniqueColors(32);

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: name.charAt(0).toUpperCase() + name.slice(1),
                data: Object.values(data),
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                },
            },
            title: {
                display: true,
                text: title,
                color: 'black',
                font: {
                    size: 18,
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;