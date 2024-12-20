import React, { useState } from 'react';
import Controller from '../Controller.ts';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header.tsx";

interface DataUploadPageProps {
    controller: Controller;
}

const DataUpload: React.FC<DataUploadPageProps> = ({ controller }) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files);
    };

    const navigate = useNavigate();

    const handleUploadClick = async () => {
        if (files) {
            setLoading(true);
            const data = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const text = await file.text();
                const json = JSON.parse(text);
                data.push(...json);
            }
            controller.loadData(data);
            setLoading(false);

            navigate("/statistics");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Data Upload Page</h2>
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="file"
                        accept="application/json"
                        multiple
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                        onClick={handleUploadClick}
                        disabled={!files || loading}
                        className={`px-6 py-2 rounded-md text-white ${
                            !files || loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        } font-semibold transition`}
                    >
                        {loading ? 'Uploading...' : 'Upload Files'}
                    </button>
                    {loading && (
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full animate-pulse"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataUpload;