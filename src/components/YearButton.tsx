import React from "react";

interface YearButtonProps {
    year: number | string;
    onClick: (year: number | string) => void;
    loading: boolean;
    isSelected: boolean;
}

const YearButton: React.FC<YearButtonProps> = ({ year, onClick, loading, isSelected }) => {
    return (
        <button
            onClick={() => onClick(year)}
            disabled={loading}
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 font-medium ${
                isSelected 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
        >
            {year}
        </button>
    );
};

export default YearButton;