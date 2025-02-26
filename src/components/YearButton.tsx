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
            className={`px-4 py-2 rounded-lg transition-colors ${
                isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
        >
            {year}
        </button>
    );
};

export default YearButton;