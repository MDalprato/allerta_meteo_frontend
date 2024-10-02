import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div className="info">
    <div className="container">
      <h1 className="heading">About This Project</h1>
      <p className="paragraph">
        Ho creato questo progetto visto che quello fornito dalla regione emilia romagna fa schifo.
      </p>
      <p className="paragraph">
        Per info visita il mio sito <a href="https://marcodalprato.com" target="_blank" rel="noopener noreferrer" className="link">marcodalprato.com</a>
      </p>
      <footer className="footer">
        <p>&copy; 2023 Marco Dal Prato. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default Info;