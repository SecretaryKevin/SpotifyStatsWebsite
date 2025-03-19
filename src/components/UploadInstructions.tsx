import React from 'react';

const UploadInstructions: React.FC = () => {
    return (
        <div className="bg-green-50 rounded p-3 mb-2">
            <h2 className="text-lg font-bold text-green-800 mb-1">How to Get Your Data</h2>
            <p className="text-green-700 text-sm mb-2">Follow these steps to download your Spotify listening history:</p>
            <ol className="list-decimal pl-5 text-green-700 text-xs space-y-1">
                <li>Go to your Spotify account page</li>
                <li>Navigate to Privacy settings</li>
                <li>Only Select Extended History</li>
                <li>Request your data</li>
                <li>Wait for spotify to send you your data</li>
                <li>Download the ZIP file when ready</li>
                <li>Extract the streaming_history_audio JSON files</li>
            </ol>
        </div>
    );
};

export default UploadInstructions;