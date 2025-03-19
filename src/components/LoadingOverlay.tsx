import React from 'react';

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Loading your statistics..." }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4">
                {/* Spinner animation */}
                <div className="flex justify-center mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                </div>

                {/* Loading message */}
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {message}
                    </h3>
                    <p className="text-gray-500">
                        Please wait while we process your data
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;