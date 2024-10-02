import React, { useState, useEffect } from 'react';
import './Stazioni.css';

const Stazioni = () => {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'nomestaz', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('http://localhost:8080/stations')
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const sortedStations = [...stations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredStations = sortedStations.filter(station =>
    station.nomestaz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => number !== '...' && handlePageChange(number)}
        className={currentPage === number ? 'active' : ''}
        disabled={number === '...'}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="container">
      <input
        type="text"
        className="search-bar"
        placeholder="Cerca..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => requestSort('nomestaz')}>Nome Stazione</th>
            <th onClick={() => requestSort('lat')}>Latitudine</th>
            <th onClick={() => requestSort('lon')}>Longitudine</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(station => (
            <tr key={station._id}>
              <td>{station.nomestaz}</td>
              <td>{station.lat}</td>
              <td>{station.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Stazioni;