import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Patrimoine from './Patrimoine';
import ListPossession from './ListePossession';
import CreatePossession from './CreatePossession';
import Header from './Header';
 


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<ListPossession />} />
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<ListPossession />} />
        <Route path="/possession/create" element={<CreatePossession />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;