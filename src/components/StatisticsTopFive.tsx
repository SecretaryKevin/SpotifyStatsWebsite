import React from 'react';
import Controller from '../Controller';
import TopFiveX from '../components/TopFiveX.tsx';

interface StatisticsTopFiveProps {
    controller: Controller;
}

const StatisticsTopFive: React.FC<StatisticsTopFiveProps> = ({ controller }) => {
    return (
        <>
            <p className="text-lg text-gray-600 mb-4">Unique Songs: {controller.getUnique("master_metadata_track_name").length}</p>
            <p className="text-lg text-gray-600 mb-4">Unique Artists: {controller.getUnique("master_metadata_album_artist_name").length}</p>
            <p className="text-lg text-gray-600 mb-4">Unique Albums: {controller.getUnique("master_metadata_album_album_name").length}</p>
            <TopFiveX title="Top Songs" items={controller.getTopFiveSongs()} />
            <TopFiveX title="Top Artists" items={controller.getTopFiveArtists()} />
            <TopFiveX title="Top Albums" items={controller.getTopFiveAlbums()} />
        </>
    );
};

export default StatisticsTopFive;