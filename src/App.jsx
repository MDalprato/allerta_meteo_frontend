import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Per lo stile
import Sidebar from './Sidebar/Sidebar';
import Mappa from './Mappa/Mappa';
import Info from './Info/Info';
import Stazioni from './Stazioni/Stazioni';
import Letture from './Letture/Letture';
import Grafico from './Grafico/Grafico';

// Vari componenti per i contenuti
const Home = () => <div>Benvenuto nella pagina Home</div>;

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
            <Route path="/grafico" element={<Grafico />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
