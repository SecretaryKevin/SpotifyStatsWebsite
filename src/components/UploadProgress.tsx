import React from 'react';

interface FileUploadProgress {
    name: string;
    progress: number;
}

interface UploadProgressProps {
    uploadProgress: FileUploadProgress[];
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploadProgress }) => {
    return (
        <div className="mb-3 w-full space-y-2">
            {uploadProgress.map((file, index) => (
                <div key={index} className="w-full">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-green-700 truncate">{file.name}</p>
                        <span className="text-xs text-green-600 font-medium">{file.progress}%</span>
                    </div>
                    <div className="w-full bg-green-200 h-1 rounded-full overflow-hidden">
                        <div
                            className="bg-green-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UploadProgress;