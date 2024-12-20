// src/components/HorizontalStackedBarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getUniqueColors } from '../colors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface HorizontalStackedBarChartProps {
    title: string;
    labels: string[];
    data: number[];
}

const HorizontalStackedBarChart: React.FC<HorizontalStackedBarChartProps> = ({ title, labels, data }) => {
    const colors = getUniqueColors(2);

    const chartData = {
        labels: [''],
        datasets: [
            {
                label: labels[0],
                data: [data[0]],
                backgroundColor: colors[0],
                borderColor: '#000000',
                borderWidth: 1,
            },
            {
                label: labels[1],
                data: [data[1]],
                backgroundColor: colors[1],
                borderColor: '#000000',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'black',
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'black',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'black',
                },
            },
            title: {
                display: true,
                text: title,
                color: 'black',
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default HorizontalStackedBarChart;