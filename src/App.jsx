import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Per lo stile
import Sidebar from './Sidebar/Sidebar';


// Vari componenti per i contenuti
const Home = () => <div>Benvenuto nella pagina Home</div>;
const Mappa = () => <div>Visualizza qui la mappa</div>;
const Letture = () => <div>Dati delle letture meteorologiche</div>;
const Stazioni = () => <div>Elenco delle stazioni meteorologiche</div>;
const Info = () => <div>Informazioni sul sistema</div>;

// Componente principale App con Router
const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mappa" element={<Mappa />} />
            <Route path="/letture" element={<Letture />} />
            <Route path="/stazioni" element={<Stazioni />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
