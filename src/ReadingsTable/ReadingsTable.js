import React, { useState, useEffect } from 'react';

const backendUri = process.env.REACT_APP_BACKEND_URI || 'http://localhost:8080';


const ReadingsTable = () => {
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        // Fetch readings data from an API or other source
        const fetchReadings = async () => {
            try {
                const response = await fetch(`${backendUri}/readings`);
                const data = await response.json();
                setReadings(data);
            } catch (error) {
                console.error('Error fetching readings:', error);
            }
        };

        fetchReadings();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Value</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {readings.map((reading) => (
                    <tr key={reading.id}>
                        <td>{reading.id}</td>
                        <td>{reading.value}</td>
                        <td>{reading.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReadingsTable;