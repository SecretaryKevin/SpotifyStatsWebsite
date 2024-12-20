import React from 'react';
import Controller from '../Controller';
import PieChart from '../components/PieChart.tsx';
import HorizontalStackedBarChart from '../components/HorizontalStackedBarChart.tsx';
import LineGraph from '../components/LineGraph.tsx';

interface StatisticsChartsProps {
    controller: Controller;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ controller }) => {
    return (
        <>
            <PieChart title="Platform Percentage" name="Platform" data={controller.getPercentage("platform")} />
            <PieChart title="Geo Percentage" name="Geo" data={controller.getPercentage("conn_country")} />
            <HorizontalStackedBarChart title="Offline vs Online" labels={['Offline', 'Online']} data={[controller.getPercentage("offline")['true'], controller.getPercentage("offline")['false']]} />
            <HorizontalStackedBarChart title="Incognito Mode" labels={['Incognito', 'Not Incognito']} data={[controller.getPercentage("incognito_mode")['true'], controller.getPercentage("incognito_mode")['false']]} />
            <HorizontalStackedBarChart title="Shuffled vs Not Shuffled" labels={['Shuffled', 'Not Shuffled']} data={[controller.getPercentage("shuffle")['true'], controller.getPercentage("shuffle")['false']]} />
            <HorizontalStackedBarChart title="Track Completion" labels={['Completed', 'Uncompleted']} data={[controller.getPercentage("reason_end")['trackdone'], controller.getPercentage("reason_end")['other']]} />
            <LineGraph title="Songs per Day" labels={Object.keys(controller.getSongsPerDay())} data={Object.values(controller.getSongsPerDay()).map(day => day.totalSongs)} />
            <LineGraph title="Playtime per Day" labels={Object.keys(controller.getSongsPerDay())} data={Object.values(controller.getSongsPerDay()).map(day => day.playtime)} />
        </>
    );
};

export default StatisticsCharts;