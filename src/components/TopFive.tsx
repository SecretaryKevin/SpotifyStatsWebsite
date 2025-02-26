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
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={item.name} className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-medium text-blue-900 mb-1">#{index + 1} Most Played {title.slice(4)}</h4>
                        <p className="text-lg font-semibold text-gray-900 mb-1">{item.name}</p>
                        {item.artist && <p className="text-sm text-gray-600 mb-2">{item.artist}</p>}
                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                                <p className="text-gray-600">Plays</p>
                                <p className="font-medium text-gray-900">{item.times_played}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Duration</p>
                                <p className="font-medium text-gray-900">{formatPlaytime(item.minutes_listened)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">% of Total</p>
                                <p className="font-medium text-gray-900">{item.percentage_of_total_songs}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopFive;