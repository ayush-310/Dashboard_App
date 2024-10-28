import { Line } from 'react-chartjs-2';

import React from 'react'

const LineChart = ({ data, selectedFeature, gender }) => (
    <div style={{ width: "500px", height: "500px" }}>
        <h2 className="text-xl font-semibold mb-2">Time Trend for Feature {selectedFeature} ({gender})</h2>
        <Line
            data={data}
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
);

export default LineChart
