import React from 'react';

interface LoadingOverlayProps {
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Loading your statistics..." }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
                {/* Spinner animation */}
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>

                {/* Loading message */}
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {message}
                    </h3>
                    <p className="text-sm text-gray-500">
                        This may take a few moments
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;