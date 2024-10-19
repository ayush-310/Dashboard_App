import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import jsonData from "../data/temp.json"
import "./style.css"

const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState('A');
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    const [dateRange, setDateRange] = useState([new Date('2022-04-10'), new Date('2022-05-10')]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setData(jsonData);
    }, []);

    useEffect(() => {
        const filtered = data.filter(item => {
            const itemDate = new Date(item.Day);
            return (
                (ageFilter === 'all' || item.Age === ageFilter) &&
                (genderFilter === 'all' || item.Gender === genderFilter) &&
                itemDate >= dateRange[0] && itemDate <= dateRange[1]
            );
        });
        setFilteredData(filtered);
    }, [ageFilter, genderFilter, dateRange, data]);

    const calculateBarChartData = () => {
        const features = ['A', 'B', 'C', 'D', 'E', 'F'];
        return features.map(feature =>
            filteredData.reduce((sum, curr) => sum + parseInt(curr[feature], 10), 0)
        );
    };

    const barChartData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [{
            label: 'Total Time Spent',
            data: calculateBarChartData(),
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }]
    };

    const lineChartData = {
        labels: filteredData.map(item => item.Day),
        datasets: [{
            label: `Time Trend for ${selectedFeature}`,
            data: filteredData.map(item => parseInt(item[selectedFeature], 10)),
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
            tension: 0.1,
        }]
    };

    const handleFeatureClick = (feature) => {
        setSelectedFeature(feature);
    };

    return (
        <>
            <div className="page">
                <div className='both'>

                    <div className='charts'>
                        {/* Bar Chart  */}
                        <div className="mb-8" style={{ width: "500px", height: "500px" }}>
                            <h2 className="text-xl font-semibold mb-2">Feature Usage</h2>
                            <Bar
                                data={barChartData}
                                options={{
                                    onClick: (e, element) => {
                                        if (element.length > 0) {
                                            const feature = barChartData.labels[element[0].index];
                                            handleFeatureClick(feature);
                                        }
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        zoom: {
                                            zoom: {
                                                wheel: { enabled: true },
                                                pinch: { enabled: true },
                                                mode: 'xy',
                                            },
                                            pan: { enabled: true, mode: 'xy' },
                                        }
                                    }
                                }}
                            />
                        </div>

                        {/* Line Chart  */}
                        <div style={{ width: "500px", height: "500px" }}>
                            <h2 className="text-xl font-semibold mb-2">Time Trend for Feature {selectedFeature}</h2>
                            <Line
                                data={lineChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        zoom: {
                                            zoom: {
                                                wheel: { enabled: true },
                                                pinch: { enabled: true },
                                                mode: 'xy',
                                            },
                                            pan: { enabled: true, mode: 'xy' },
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>



                    {/* Table */}
                    <div className="filter-container">
                        <h2 className="filter-title">Filters</h2>
                        <div className="filter-controls">
                            <div className="filter-group">
                                <label className="filter-label" htmlFor="age-filter">Age Group</label>
                                <select
                                    id="age-filter"
                                    className="filter-select"
                                    value={ageFilter}
                                    onChange={(e) => setAgeFilter(e.target.value)}
                                >
                                    <option value="15-25">15-25</option>
                                    <option value=">25">&gt;25</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label className="filter-label" htmlFor="gender-filter">Gender</label>
                                <select
                                    id="gender-filter"
                                    className="filter-select"
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label className="filter-label" htmlFor="date-range">Date Range</label>
                                <DatePicker
                                    id="date-range"
                                    selectsRange={true}
                                    startDate={dateRange[0]}
                                    endDate={dateRange[1]}
                                    onChange={(update) => {
                                        setDateRange(update);
                                    }}
                                    className="filter-datepicker"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AnalyticsDashboard;