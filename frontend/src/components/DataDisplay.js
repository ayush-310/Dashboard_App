import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Data from Excel</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                        <th>F</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            {console.log(item.date)}
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.A}</td>
                            <td>{item.B}</td>
                            <td>{item.C}</td>
                            <td>{item.D}</td>
                            <td>{item.E}</td>
                            <td>{item.F}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataDisplay;
