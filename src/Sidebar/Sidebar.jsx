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
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/mappa">
              <FontAwesomeIcon icon={faMap} />
              {isExpanded && <span>Mappa</span>}
            </Link>
          </li>
          <li>
            <Link to="/letture">
              <FontAwesomeIcon icon={faBook} />
              {isExpanded && <span>Letture</span>}
            </Link>
          </li>
          <li>
            <Link to="/stazioni">
              <FontAwesomeIcon icon={faBuilding} />
              {isExpanded && <span>Stazioni</span>}
            </Link>
          </li>
          <li>
            <Link to="/info">
              <FontAwesomeIcon icon={faInfoCircle} />
              {isExpanded && <span>Info</span>}
            </Link>
          </li>
        </ul>
      </div>
    );
  };

export default Sidebar;