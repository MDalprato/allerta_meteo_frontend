import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMap, faBook, faBuilding, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-header">
          <button onClick={toggleSidebar} className="toggle-btn">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <ul>
          <Link to="/">
            <li>
              <FontAwesomeIcon icon={faHome} />
              {isExpanded && <span>Home</span>}
            </li>
          </Link>
          <Link to="/mappa">
            <li>
              <FontAwesomeIcon icon={faMap} />
              {isExpanded && <span>Mappa</span>}
            </li>
          </Link>
          <Link to="/letture">
            <li>
              <FontAwesomeIcon icon={faBook} />
              {isExpanded && <span>Letture</span>}
            </li>
          </Link>
          <Link to="/stazioni">
            <li>
              <FontAwesomeIcon icon={faBuilding} />
              {isExpanded && <span>Stazioni</span>}
            </li>
          </Link>
          <Link to="/info">
            <li>
              <FontAwesomeIcon icon={faInfoCircle} />
              {isExpanded && <span>Info</span>}
            </li>
          </Link>
        </ul>
      </div>
    );
  };

export default Sidebar;