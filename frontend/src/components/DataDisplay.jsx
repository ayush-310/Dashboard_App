import React, { useState, useEffect, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import jsonData from "../data/temp.json";
import "./style.css";
import BarChart from './BarChart';
import LineChart from './LineChart';
import FilterControls from './FilterControls';

// Custom hook for data filtering
const useFilteredData = (data, ageFilter, genderFilter, startDate, endDate) => {
    return useMemo(() => {
        return data.filter(item => {
            const itemDate = new Date(item.Day);
            return (
                (ageFilter === 'all' || item.Age === ageFilter) &&
                (genderFilter === 'all' || item.Gender === genderFilter) &&
                itemDate >= startDate && itemDate <= endDate
            );
        });
    }, [data, ageFilter, genderFilter, startDate, endDate]);
};

const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState('A');
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [startDate, setStartDate] = useState(new Date('2022-04-10'));
    const [endDate, setEndDate] = useState(new Date('2022-05-10'));

    useEffect(() => {
        setData(jsonData);
    }, []);

    const filteredData = useFilteredData(data, ageFilter, genderFilter, startDate, endDate);

    // Memoized bar chart data calculation
    const barChartData = useMemo(() => {
        const features = ['A', 'B', 'C', 'D', 'E', 'F'];
        const data = features.map(feature =>
            filteredData.reduce((sum, item) => sum + parseInt(item[feature], 10), 0)
        );

        return {
            labels: features,
            datasets: [{
                label: `Total Time Spent (${genderFilter})`,
                data,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }]
        };
    }, [filteredData, genderFilter]);

    // Memoized line chart data calculation
    const lineChartData = useMemo(() => {
        return {
            labels: filteredData.map(item => item.Day),
            datasets: [{
                label: `Time Trend for ${selectedFeature} (${genderFilter})`,
                data: filteredData.map(item => parseInt(item[selectedFeature], 10)),
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
                tension: 0.1,
            }]
        };
    }, [filteredData, selectedFeature, genderFilter]);

    const handleFeatureClick = (feature) => {
        setSelectedFeature(feature);
    };

    return (
        <div className="pg">
            <div className='both'>
                <div className='charts'>
                    <BarChart data={barChartData} onFeatureClick={handleFeatureClick} gender={genderFilter} />
                    <LineChart data={lineChartData} selectedFeature={selectedFeature} gender={genderFilter} />
                </div>

                {/* Filters */}
                <FilterControls
                    ageFilter={ageFilter}
                    setAgeFilter={setAgeFilter}
                    genderFilter={genderFilter}
                    setGenderFilter={setGenderFilter}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
