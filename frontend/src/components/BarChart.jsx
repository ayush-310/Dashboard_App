import React from 'react'
import { Bar } from 'react-chartjs-2';


const BarChart = ({ data, onFeatureClick, gender }) => (
    <div style={{ width: "500px", height: "500px" }}>
        <h2 className="text-xl font-semibold mb-2">Feature Usage ({gender})</h2>
        <Bar
            data={data}
            options={{
                onClick: (e, element) => {
                    if (element.length > 0) {
                        const feature = data.labels[element[0].index];
                        onFeatureClick(feature);
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
);

export default BarChart
