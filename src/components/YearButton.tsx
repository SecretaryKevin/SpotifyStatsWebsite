import React from 'react';

interface YearButtonProps {
    year: number;
    onClick: (year: number) => void;
    loading: boolean;
}

const YearButton: React.FC<YearButtonProps> = ({ year, onClick, loading }) => {
    return (
        <button
            onClick={() => onClick(year)}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } font-semibold transition`}
        >
            {year}
        </button>
    );
};

export default YearButton;