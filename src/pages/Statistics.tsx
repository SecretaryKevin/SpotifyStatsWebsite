import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import Controller from "../Controller";
import YearButton from "../components/YearButton";
import StatisticsSummary from "../components/StatisticsSummary";
import StatisticsCharts from "../components/StatisticsCharts";
import Header from "../components/Header";
import LoadingOverlay from "../components/LoadingOverlay";
import TopFive from "../components/TopFive";

type YearSelection = number | 'all';

interface StatisticsPageProps {
    controller: Controller;
}

const Statistics: React.FC<StatisticsPageProps> = ({ controller }) => {
    const [selectedYear, setSelectedYear] = useState<YearSelection>(() => {
        const initialYear = controller.getSelectedYear();
        return typeof initialYear === 'number' ? initialYear : 'all';
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleYearChange = async (year: YearSelection) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 300));
            controller.setSelectedYear(year);
            setSelectedYear(year);
        } catch (error) {
            console.error('Error changing year:', error);
        } finally {
            setLoading(false);
        }
    };

    if (Object.keys(controller.songs).length === 0) {
        return <Navigate to="/loadData" />;
    }

    const years = controller.getYears();

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <Header />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <div className="mb-8">
                    <h2 className="text-xl font-medium text-gray-600 mb-3">Select Time Period</h2>
                    <div className="flex flex-wrap gap-2">
                        <YearButton
                            key="all"
                            year="all"
                            isSelected={selectedYear === 'all'}
                            onClick={() => handleYearChange('all')}
                            loading={loading}
                        />
                        {years.map(year => (
                            <YearButton
                                key={year}
                                year={year}
                                isSelected={year === selectedYear}
                                onClick={() => handleYearChange(year)}
                                loading={loading}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <StatisticsSummary
                        controller={controller}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TopFive
                            title="Top Songs"
                            items={controller.getTopFiveSongs()}
                        />
                        <TopFive
                            title="Top Artists"
                            items={controller.getTopFiveArtists()}
                        />
                        <TopFive
                            title="Top Albums"
                            items={controller.getTopFiveAlbums()}
                        />
                    </div>

                    <StatisticsCharts controller={controller} />
                </div>
            </div>

            {loading && <LoadingOverlay message="Loading statistics..." />}
        </div>
    );
};

export default Statistics;