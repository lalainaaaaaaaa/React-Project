import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import ListePossession from './ListePossession';
import CreatePossession from './CreatePossession';
import UpdatePossession from './Update';
import Patrimoine from './Patrimoine';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/ListePossession" element={<ListePossession />} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
          <Route path="/patrimoine" element={<Patrimoine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;