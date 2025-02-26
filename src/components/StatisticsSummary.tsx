import React from 'react';
import Controller from '../Controller';

interface StatisticsSummaryProps {
    controller: Controller;
    TimeListened: number;
}

const StatisticsSummary: React.FC<StatisticsSummaryProps> = ({ controller }) => {
    return (
        <div>
            <p className="text-lg text-gray-600 mb-4">Total Play Time in Minutes: {controller.getTotalTimeListened().toLocaleString()}</p>
        </div>
    );
};

export default StatisticsSummary;