import React, { useState, useEffect } from 'react';
import './Letture.css';

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;

const Letture = () => {
  const [time, setTime] = useState('1h');
  const [readings, setReadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${backendUri}/readings?time=${time}`)
      .then(response => response.json())
      .then(data => setReadings(data))
      .catch(error => console.error('Error fetching readings:', error));
  }, [time]);

  const filteredReadings = readings.filter(reading =>
    reading.nomestaz && reading.nomestaz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReadings = filteredReadings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredReadings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="letture">
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
      <div>
        <p>Number of readings displayed: {filteredReadings.length}</p>
      </div>
      <table id="readingsTable">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Nome Stazione</th>
            <th>Lon</th>
            <th>Lat</th>
            <th>Value</th>
            <th>Soglia 1</th>
            <th>Soglia 2</th>
            <th>Soglia 3</th>
            <th>Percentuale Riempimento</th>
          </tr>
        </thead>
        <tbody>
          {currentReadings.map((reading) => {
            const percentualeRiempimento = (reading.value / reading.soglia3) * 100;
            let rowColor = '';

            if (isFinite(percentualeRiempimento)) {
              if (reading.value > reading.soglia3) {
                rowColor = '#ffcccc'; // Soft red
              } else if (reading.value > reading.soglia2) {
                rowColor = '#ffe5b4'; // Soft orange
              } else if (reading.value > reading.soglia1) {
                rowColor = '#ccffcc'; // Soft green
              }
            }

            return (
              <tr key={reading._id.$oid} style={{ backgroundColor: rowColor }}>
                <td>{new Date(reading.timestamp).toLocaleString()}</td>
                <td>{reading.nomestaz}</td>
                <td>{reading.lon}</td>
                <td>{reading.lat}</td>
                <td>{reading.value}</td>
                <td>{reading.soglia1}</td>
                <td>{reading.soglia2}</td>
                <td>{reading.soglia3}</td>
                <td>{isFinite(percentualeRiempimento) ? `${percentualeRiempimento.toFixed(2)}%` : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Letture;