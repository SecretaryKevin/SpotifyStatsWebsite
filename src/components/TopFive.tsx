import React from 'react';

interface TopFiveProps {
    title: string;
    items: {
        name: string;
        artist?: string;
        times_played: number;
        minutes_listened: number;
        percentage_of_total_songs: number;
    }[];
}

const TopFive: React.FC<TopFiveProps> = ({ title, items }) => {
    const formatPlaytime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.round(minutes % 60);
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.name} 
                         className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl 
                                  hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                                {item.artist && <p className="text-gray-600">{item.artist}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Plays</p>
                                <p className="text-lg font-semibold text-gray-900">{item.times_played}</p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {formatPlaytime(item.minutes_listened)}
                                </p>
                            </div>
                            <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                                <p className="text-sm text-gray-500">% of Total</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {item.percentage_of_total_songs}%
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopFive;