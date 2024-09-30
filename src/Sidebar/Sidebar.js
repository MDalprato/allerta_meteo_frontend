import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li><a href="/map">map</a></li>
                <li><a href="/dashboard">dashboard</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;