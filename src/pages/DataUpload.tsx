// Updated DataUpload.tsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";
import UploadInstructions from "../components/UploadInstructions";
import TutorialFrame from "../components/TutorialFrame";
import FileUploader from "../components/FileUploader";
import Controller from '../Controller.ts';
import { validateSpotifyData } from '../utils/dataValidator';

interface DataUploadPageProps {
    controller: Controller;
}

interface FileUploadProgress {
    name: string;
    progress: number;
}

const DataUpload: React.FC<DataUploadPageProps> = ({ controller }) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>([]);
    const [validationError, setValidationError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFilesSelected = (selectedFiles: FileList) => {
        setFiles(selectedFiles);
        setValidationError(null);
        const initialProgress = Array.from(selectedFiles).map(file => ({
            name: file.name,
            progress: 0,
        }));
        setUploadProgress(initialProgress);
    };

    const handleUpload = async () => {
    if (!files) return;

    setLoading(true);
    setValidationError(null);
    const data = [];

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const text = await file.text();
            let json;

            // Parse JSON
            try {
                json = JSON.parse(text);
            } catch (error) {
                throw new Error(`There is an issue with the uploaded files. Please make sure you're only uploading the original JSON files from your Spotify data download (files should be named like 'Streaming_History_Audio_*.json').`);
            }

            // Validate against Song interface - pass the filename as well
            const validationResult = validateSpotifyData(json, file.name);
            if (!validationResult.valid) {
                throw new Error(`${validationResult.sampleErrors.join(' ')}`);
            }

            data.push(...json);

            // Update progress
            setUploadProgress(prevProgress => {
                const newProgress = [...prevProgress];
                newProgress[i].progress = 100;
                return newProgress;
            });
        }

        controller.loadData(data);
        setLoading(false);
        navigate("/statistics");
    } catch (error) {
        setLoading(false);
        setValidationError(error instanceof Error ? error.message : "There is an issue with the uploaded files. Please make sure you're only uploading the original Spotify data files.");
    }
};


    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 container mx-auto py-2 px-4">
                <div className="bg-white rounded-lg shadow overflow-hidden h-full">
                    <div className="flex h-full">
                        {/* Left Panel */}
                        <div className="w-1/2 p-4 relative">
                            <UploadInstructions />
                            <div className="relative h-[calc(100%-7rem)]">
                                <TutorialFrame/>
                            </div>
                        </div>
                        {/* Right Panel */}
                        <div className="w-1/2 p-4 bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
                            {validationError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{validationError}</span>
                                </div>
                            )}
                            <FileUploader
                                files={files}
                                loading={loading}
                                uploadProgress={uploadProgress}
                                onFilesSelected={handleFilesSelected}
                                onUpload={handleUpload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataUpload;