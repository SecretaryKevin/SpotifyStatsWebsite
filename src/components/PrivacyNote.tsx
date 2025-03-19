import React from 'react';

const PrivacyNote: React.FC = () => {
    return (
        <p className="text-xs text-green-700 mt-2 text-center">
            <span className="font-semibold">Privacy Note:</span> Your data is processed locally and never leaves your device.
        </p>
    );
};

export default PrivacyNote;
