import React, {useState, useRef, useEffect} from 'react';

const TutorialFrame: React.FC = () => {
    const [iframeLoading, setIframeLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleIframeLoad = () => {
        setIframeLoading(false);
    };

    useEffect(() => {
        // @ts-expect-error this has to be there else dom will complain about the iframe loading system
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const iframe = iframeRef.current;
        return () => {
        };
    }, []);

    return (
        <div className="relative w-full h-640">
            {iframeLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-green-600 font-medium text-sm">Loading tutorial...</p>
                    </div>
                </div>
            )}
            <iframe
                ref={iframeRef}
                src="https://scribehow.com/embed/How_To_Request_Your_Spotify_Data__3V3Z68HqQOKjnheHrl-L9Q?as=scrollable"
                width="100%"
                height="640"
                allowFullScreen
                className="rounded shadow-sm"
                onLoad={handleIframeLoad}
                title="Spotify Data Request Tutorial">
            </iframe>
        </div>
    );
};

export default TutorialFrame;