import React, { useState, useEffect } from 'react';
import './Stazioni.css';

const backendUri = import.meta.env.VITE_BACKEND_ENDPOINT;

const Stazioni = () => {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${backendUri}/stations`)
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching stations:', error));
  }, []);

  const filteredStations = stations.filter(station =>
    station.nomestaz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStations = filteredStations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

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
    <div className="Stazioni">
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
        <p>Number of stations displayed: {filteredStations.length}</p>
      </div>
      <table id="readingsTable">
        <thead>
          <tr>
            <th>Nome Stazione</th>
            <th>Lon</th>
            <th>Lat</th>
          </tr>
        </thead>
        <tbody>
          {currentStations.map((station) => (
            <tr key={station._id}>
              <td>{station.nomestaz}</td>
              <td>{station.lon}</td>
              <td>{station.lat}</td>
            </tr>
          ))}
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

export default Stazioni;