import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePossession: React.FC = () => {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState(0);
  const [dateDebut, setDateDebut] = useState('');
  const [taux, setTaux] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/possession', {
      libelle,
      valeur,
      dateDebut,
      taux,
    });
    navigate('/possession');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Libelle" onChange={(e) => setLibelle(e.target.value)} required />
      <input type="number" placeholder="Valeur" onChange={(e) => setValeur(Number(e.target.value))} required />
      <input type="date" onChange={(e) => setDateDebut(e.target.value)} required />
      <input type="number" placeholder="Taux" onChange={(e) => setTaux(Number(e.target.value))} required />
      <button type="submit">Créer Possession</button>
    </form>
  );
};

export default CreatePossession;