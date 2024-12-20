import React from 'react';

interface TopFiveXProps {
    title: string;
    items: { name: string; artist?: string; times_played: number; percentage_of_total_songs: number; minutes_listened: number }[];
}

const TopFiveX: React.FC<TopFiveXProps> = ({ title, items }) => {
    return (
        <div>
            <h2>{title}</h2>
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} {item.artist && `by ${item.artist}`} - Played {item.times_played} times, {item.percentage_of_total_songs}% of total songs, {item.minutes_listened} minutes listened.
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TopFiveX;