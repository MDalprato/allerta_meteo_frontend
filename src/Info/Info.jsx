import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div className="container">
      <h1 className="heading">About This Project</h1>
      <p className="paragraph">
        This project is designed to showcase the capabilities of our application. It includes various features and functionalities to demonstrate its potential.
      </p>
      <p className="paragraph">
        For more information, visit <a href="https://marcodalprato.com" target="_blank" rel="noopener noreferrer" className="link">marcodalprato.com</a>
      </p>
      <footer className="footer">
        <p>&copy; 2023 Marco Dal Prato. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Info;