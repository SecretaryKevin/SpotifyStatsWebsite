import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import colorSet from '../colors';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface LineGraphProps {
    title: string;
    labels: string[];
    data: number[];
    colors?: string[];
}

const LineGraph: React.FC<LineGraphProps> = ({ title, labels, data, colors }) => {
    const selectedColors = colors && colors.length > 0 ? colors : colorSet;

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                borderColor: selectedColors[0],
                backgroundColor: selectedColors[1] ? selectedColors[1] : 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: selectedColors[2] ? selectedColors[2] : selectedColors[0],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: selectedColors[3] ? selectedColors[3] : selectedColors[0],
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
                color: 'white',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraph;