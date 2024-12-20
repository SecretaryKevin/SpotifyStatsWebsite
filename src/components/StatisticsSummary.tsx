import React from 'react';
import Controller from '../Controller';

interface StatisticsSummaryProps {
    selectedYear: number | null;
    controller: Controller;
}

const StatisticsSummary: React.FC<StatisticsSummaryProps> = ({ selectedYear, controller }) => {
    return (
        <div>
            <p className="text-lg text-gray-600 mb-4">Selected Year: {selectedYear !== null ? selectedYear : controller.getSelectedYear()}</p>
            <p className="text-lg text-gray-600 mb-4">Total Play Time in Minutes: {controller.getTotalTimeListened()}</p>
        </div>
    );
};

export default StatisticsSummary;