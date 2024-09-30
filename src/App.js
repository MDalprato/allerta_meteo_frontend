import './App.css';
import Sidebar from './Sidebar/Sidebar';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map/Map";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<Map />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
