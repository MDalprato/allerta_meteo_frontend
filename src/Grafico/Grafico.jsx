import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './grafico.css'; // Importa il file CSS

// Registra le componenti necessarie di Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;

const Grafico = () => {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');
    const [readings, setReadings] = useState([]);
    const [thresholds, setThresholds] = useState({ soglia1: 0, soglia2: 0, soglia3: 0 });

    useEffect(() => {
        // Fetch the list of stations
        fetch(`${backendUri}/stations`)
            .then(response => response.json())
            .then(data => setStations(data))
            .catch(error => console.error('Error fetching stations:', error));
    }, []);

    const handleStationChange = (event) => {
        const stationId = event.target.value;
        setSelectedStation(stationId);

        const selectedStationData = stations.find(station => station.idstazione === stationId);
        if (selectedStationData) {
            setThresholds({
                soglia1: selectedStationData.soglia1 || 0,
                soglia2: selectedStationData.soglia2 || 0,
                soglia3: selectedStationData.soglia3 || 0,
            });
        }

        // Fetch readings for the selected station
        fetch(`${backendUri}/get_readings_by_station_id?stationId=${stationId}`)
            .then(response => response.json())
            .then(data => setReadings(data))
            .catch(error => console.error('Error fetching readings:', error));
    };

    const chartData = {
        labels: readings.map(reading => new Date(reading.timestamp).toLocaleString()),
        datasets: [
            {
                label: 'Readings',
                data: readings.map(reading => reading.value),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Soglia 1',
                data: readings.map(() => thresholds.soglia1),
                fill: false,
                borderColor: 'green',
                borderDash: [10, 5],
            },
            {
                label: 'Soglia 2',
                data: readings.map(() => thresholds.soglia2),
                fill: false,
                borderColor: 'orange',
                borderDash: [10, 5],
            },
            {
                label: 'Soglia 3',
                data: readings.map(() => thresholds.soglia3),
                fill: false,
                borderColor: 'red',
                borderDash: [10, 5],
            },
        ],
    };

    return (
        <div className="grafico">
            <div className="container">
                <div className="select-container">
                    <select value={selectedStation} onChange={handleStationChange}>
                        <option value="">Select a station</option>
                        {stations.map(station => (
                            <option key={station.idstazione} value={station.idstazione}>
                                {station.nomestaz}
                            </option>
                        ))}
                    </select>
                </div>
                {readings.length > 0 && (
                    <div className="chart-container">
                        <Line data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Grafico;