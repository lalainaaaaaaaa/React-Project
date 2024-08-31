import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Statistiques from './Statistiques'; 

const App = () => {
  const biens = [];
  const valeurTotale =12;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/patrimoine" element={<Statistiques biens={biens} valeurTotale={valeurTotale} />} />
        <Route path="/possession" element={<div>Menu Possessions</div>} />
      </Routes>
    </Router>
  );
};

export default App;