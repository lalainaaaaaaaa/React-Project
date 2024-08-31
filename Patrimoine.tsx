import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Statistique {
  libelle: string;
  valeur: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
  }[];
}

const GestionPatrimoine: React.FC = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [jour, setJour] = useState('');
  const [valeur, setValeur] = useState<number | null>(null);
  const [dataChart, setDataChart] = useState<ChartData>({ labels: [], datasets: [] }); // État pour les données du graphique

  const handleValidate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/patrimoine/range', {
        type: 'month',
        dateDebut,
        dateFin,
        jour,
      });
      setValeur(response.data.valeur);

      const labels = response.data.statistiques.map((stat: Statistique) => stat.libelle);
      const values = response.data.statistiques.map((stat: Statistique) => stat.valeur);

      setDataChart({
        labels: labels,
        datasets: [
          {
            label: 'Valeurs des Statistiques',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Liste des Patrimoines</h1>
      <input type="date" onChange={(e) => setDateDebut(e.target.value)} />
      <input type="date" onChange={(e) => setDateFin(e.target.value)} />
      <input type="number" onChange={(e) => setJour(e.target.value)} />
      <button onClick={handleValidate}>Valider</button>
      {valeur !== null && <div>Valeur: {valeur}</div>}

   
      {/* Affichage du graphique */}
      {dataChart.labels.length > 0 && (
        <div>
          <h2>Graphique des Statistiques</h2>
          <Line data={dataChart} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default GestionPatrimoine;