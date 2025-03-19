import React from 'react';
import Controller from '../Controller';

interface StatisticsSummaryProps {
    controller: Controller;
}

const StatisticsSummary: React.FC<StatisticsSummaryProps> = ({ controller }) => {
    const StatCard = ({ title, value }: { title: string, value: string }) => (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-semibold text-blue-600">{value}</p>
        </div>
    );

    return (
        <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">Listening Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Total Hours"
                    value={(controller.getTotalTimeListened() / 60).toLocaleString(undefined, {maximumFractionDigits: 1})}
                />
                <StatCard
                    title="Total Minutes"
                    value={controller.getTotalTimeListened().toLocaleString()}
                />
                <StatCard
                    title="Total Songs"
                    value={controller.getTotalNumberOfSongs().toLocaleString()}
                />
                <StatCard
                    title="Unique Artists"
                    value={controller.getTotalNumberOfArtists().toLocaleString()}
                />
                <StatCard
                    title="Unique Albums"
                    value={controller.getTotalNumberOfAlbums().toLocaleString()}
                />
            </div>
        </div>
    );
};

export default StatisticsSummary;