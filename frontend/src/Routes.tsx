import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import ListPossession from './ListePossession';
import CreatePossession from './CreatePossession';
import GestionPatrimoine from './Patrimoine'; 

const AppRoutes: React.FC = () => {
    return (
        <>
            <Header /> 
            <Routes>
                <Route path="/" element={<ListPossession />} />
                <Route path="/patrimoine" element={<GestionPatrimoine />} />
                <Route path="/possession" element={<ListPossession />} />
                <Route path="/possession/create" element={<CreatePossession />} />
            </Routes>
        </>
    );
};

export default AppRoutes;