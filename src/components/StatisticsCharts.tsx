import React from 'react';
import Controller from '../Controller';
import PieChart from './PieChart';
import HorizontalStackedBarChart from './HorizontalStackedBarChart';
import LineGraph from './LineGraph';

interface StatisticsChartsProps {
    controller: Controller;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({controller}) => {


    const ChartContainer = ({children}: { children: React.ReactNode }) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {children}
        </div>
    );

    return (
        <div className="w-full space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <ChartContainer>
                        <PieChart
                            title="Platform Distribution"
                            name="Platform"
                            data={controller.getPercentageByPlatformCategory("platform")}
                        />
                    </ChartContainer>
                    <ChartContainer>
                        <PieChart
                            title="Geographic Distribution"
                            name="Geo"
                            data={controller.getPercentage("conn_country")}
                        />
                    </ChartContainer>
                </div>

                <div className="space-y-6">
                    <ChartContainer>
                        <HorizontalStackedBarChart
                            title="Offline vs Online"
                            labels={['Offline', 'Online']}
                            data={[
                                controller.getPercentage("offline")['true'],
                                controller.getPercentage("offline")['false']
                            ]}
                        />
                    </ChartContainer>
                    <ChartContainer>
                        <HorizontalStackedBarChart
                            title="Track Completion"
                            labels={['Completed', 'Uncompleted']}
                            data={[
                                controller.getPercentage("reason_end")['trackdone'],
                                controller.getPercentage("reason_end")['other']
                            ]}
                        />
                    </ChartContainer>
                    <ChartContainer>
                        <HorizontalStackedBarChart
                            title="Public vs Private Listening"
                            labels={['Public   ', 'Private']}
                            data={[
                                controller.getPercentage("incognito_mode")['false'],
                                controller.getPercentage("incognito_mode")['true']

                            ]}
                        />
                    </ChartContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer>
                    <LineGraph
                        title="Songs Played per Day"
                        labels={Object.keys(controller.getSongsPerDay())}
                        data={Object.values(controller.getSongsPerDay()).map(day => day.totalSongs)}
                    />
                </ChartContainer>
                <ChartContainer>
                    <LineGraph
                        title="Daily Listening Time"
                        labels={Object.keys(controller.getSongsPerDay())}
                        data={Object.values(controller.getSongsPerDay()).map(day => day.playtime)}
                    />
                </ChartContainer>
            </div>
        </div>
    );
};

export default StatisticsCharts;