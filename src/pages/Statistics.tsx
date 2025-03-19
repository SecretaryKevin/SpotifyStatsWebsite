import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Controller from "../Controller";
import YearButton from "../components/YearButton";
import StatisticsSummary from "../components/StatisticsSummary";
import StatisticsCharts from "../components/StatisticsCharts";
import Header from "../components/Header";
import LoadingOverlay from "../components/LoadingOverlay";
import TopFive from "../components/TopFive";

type YearSelection = number | 'All';
type TabSelection = 'summary' | 'charts';

interface StatisticsPageProps {
    controller: Controller;
}

const Statistics: React.FC<StatisticsPageProps> = ({ controller }) => {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState<YearSelection>(() => {
        const initialYear = controller.getSelectedYear();
        return typeof initialYear === 'number' ? initialYear : 'All';
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<TabSelection>('summary');

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

    const handleClearData = () => {
        // Clear the controller data
        controller.clearData();
        // Navigate to the load data page
        navigate('/loadData');
    };

    if (Object.keys(controller.songs).length === 0) {
        return <Navigate to="/loadData" />;
    }

    const years = controller.getYears();

    const TabButton: React.FC<{ tab: TabSelection; label: string }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <Header />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-medium text-gray-600">Select Time Period</h2>
                    <button
                        onClick={handleClearData}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                        Clear Data
                    </button>
                </div>

                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        <YearButton
                            key="All"
                            year="All"
                            isSelected={selectedYear === 'All'}
                            onClick={() => handleYearChange('All')}
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

                <div className="mb-6 flex border-b">
                    <TabButton tab="summary" label="Summary & Top Items" />
                    <TabButton tab="charts" label="Charts & Graphs" />
                </div>

                {activeTab === 'summary' && (
                    <div className="space-y-8">
                        <StatisticsSummary controller={controller} />
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
                    </div>
                )}

                {activeTab === 'charts' && (
                    <StatisticsCharts controller={controller} />
                )}
            </div>

            {loading && <LoadingOverlay message="Loading statistics..." />}
        </div>
    );
};

export default Statistics;