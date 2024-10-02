import React, { useState, useEffect } from 'react';
import './Letture.css';

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;


const Letture = () => {
  const [time, setTime] = useState('1h');
  const [readings, setReadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    
    fetch(`${backendUri}/readings?time=${time}`)
      .then(response => response.json())
      .then(data => setReadings(data))
      .catch(error => console.error('Error fetching readings:', error));
  }, [time]);

  const filteredReadings = readings.filter(reading =>
    reading.nomestaz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Letture">
      <div>
        <label htmlFor="timeSelect">Select Time:</label>
        <select id="timeSelect" value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="1h">1h</option>
          <option value="2h">2h</option>
          <option value="12h">12h</option>
          <option value="24h">24h</option>
          <option value="48h">48h</option>
        </select>
      </div>
      <div>
        <label htmlFor="searchInput">Search by Station Name:</label>
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search station name..."
        />
      </div>
      <table id="readingsTable">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Nome Stazione</th>
            <th>Lon</th>
            <th>Lat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredReadings.map((reading) => (
            <tr key={reading._id.$oid}>
              <td>{new Date(reading.timestamp).toLocaleString()}</td>
              <td>{reading.nomestaz}</td>
              <td>{reading.lon}</td>
              <td>{reading.lat}</td>
              <td>{reading.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Letture;