import React, { useState, useCallback } from 'react';
import UploadProgress from './UploadProgress';
import PrivacyNote from './PrivacyNote';

interface FileUploadProgress {
    name: string;
    progress: number;
}

interface FileUploaderProps {
    files: FileList | null;
    loading: boolean;
    uploadProgress: FileUploadProgress[];
    onFilesSelected: (files: FileList) => void;
    onUpload: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    files,
    loading,
    uploadProgress,
    onFilesSelected,
    onUpload
}) => {
    const [dragging, setDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFilesSelected(event.target.files);
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files) {
            onFilesSelected(event.dataTransfer.files);
        }
    }, [onFilesSelected]);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragging(false);
    }, []);

    const handleFileInputClick = () => {
        document.getElementById('file-input')?.click();
    };

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-1 text-center">Upload Your Data</h2>
            <p className="text-green-700 text-center mb-3 text-sm max-w-md">
                Please upload all streaming_history_audio JSON files from your Spotify data package.
            </p>
            <div
                onClick={handleFileInputClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded p-4 w-full mb-3 text-center cursor-pointer transition-all ${
                    dragging ? 'border-green-600 bg-green-100' : 'border-green-300 hover:border-green-500 hover:bg-green-50'
                }`}
            >
                <input
                    id="file-input"
                    type="file"
                    accept="application/json"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <p className="text-green-700 font-medium text-sm">
                    {files ? `${files.length} file(s) selected` : 'Drag and drop your files here'}
                </p>
                <p className="text-green-600 text-xs mt-1">
                    {files ? 'Click to change selection' : 'or click to browse'}
                </p>
            </div>

            <div className="w-full">
                {files && uploadProgress.length > 0 && (
                    <UploadProgress uploadProgress={uploadProgress} />
                )}

                <button
                    onClick={onUpload}
                    disabled={!files || loading}
                    className={`w-full py-2 rounded text-white font-medium shadow transition-all ${
                        !files || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 hover:shadow-md"
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Files...
                        </div>
                    ) : 'Analyze My Spotify Data'}
                </button>

                {loading && (
                    <div className="mt-2 w-full">
                        <div className="w-full bg-green-200 h-1 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-xs text-green-600 mt-1 text-center">
                            Processing your data...
                        </p>
                    </div>
                )}

                <PrivacyNote />
            </div>
        </div>
    );
};

export default FileUploader;