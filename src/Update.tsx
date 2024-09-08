import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const UpdatePossession = () => {
  const { libelle } = useParams<{ libelle: string }>();
  const navigate = useNavigate();
  const [possession, setPossession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/possessions/${libelle}`);
        setPossession(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération de la possession.');
      } finally {
        setLoading(false);
      }
    };
    fetchPossession();
  }, [libelle]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPossession((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/possessions/${libelle}`, possession);
      navigate('/possessions'); 
    } catch (error) {
      setError('Erreur lors de la mise à jour de la possession.');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Modifier la Possession</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Libelle"
          name="libelle"
          value={possession?.Libelle || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Valeur"
          name="valeur"
          type="number"
          value={possession?.Valeur || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date Début"
          name="dateDebut"
          type="date"
          value={possession?.DateDebut || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Date Fin"
          name="dateFin"
          type="date"
          value={possession?.DateFin || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Taux"
          name="taux"
          type="number"
          value={possession?.Taux || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Mettre à Jour
        </Button>
      </form>
    </div>
  );
};

export default UpdatePossession;