import React, { useState, useEffect } from 'react';
import Controller from "../Controller";
import { Navigate } from "react-router-dom";
import YearButton from "../components/YearButton.tsx";
import StatisticsSummary from "../components/StatisticsSummary.tsx";
import StatisticsCharts from "../components/StatisticsCharts.tsx";
import StatisticsTopFive from "../components/StatisticsTopFive.tsx";
import Header from "../components/Header.tsx";

interface StatisticsPageProps {
    controller: Controller;
}

const Statistics: React.FC<StatisticsPageProps> = ({ controller }) => {
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedYear !== null) {
            setLoading(true);
            controller.setSelectedYear(selectedYear);
            setLoading(false);
        }
    }, [selectedYear, controller]);

    if (Object.keys(controller.songs).length === 0) {
        return <Navigate to="/loadData" />;
    }

    const years = controller.getYears();

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">Statistics Page</h1>
                <StatisticsSummary selectedYear={selectedYear} controller={controller} />
                <div className="flex flex-wrap gap-2 mb-4">
                    {years.map(year => (
                        <YearButton
                            key={year}
                            year={year}
                            onClick={setSelectedYear}
                            loading={loading}
                        />
                    ))}
                </div>
                {loading ? <p className="text-lg text-gray-600">Loading...</p> : (
                    <>
                        <StatisticsCharts controller={controller} />
                        <StatisticsTopFive controller={controller} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Statistics;