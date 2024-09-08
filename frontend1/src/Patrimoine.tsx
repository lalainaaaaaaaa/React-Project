import React, { useState } from 'react';
import Navbar from './Navbar'; 
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './Patrimoine.css';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Statistique {
  libelle: string;
  valeur: number;
}

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

const GestionPatrimoine: React.FC = () => {
  const [dataChart, setDataChart] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const staticData: Statistique[] = [
    { libelle: '1 Jan 2019 - 31 Dec 2022', valeur: 100 }, 
    { libelle: '1 Jan 2022 - 31 Dec 2023', valeur: 150 }, 
    { libelle: '25 Dec 2023 - Now', valeur: 200 }, 
    { libelle: '26 Jun 2024 - 26 Jun 2025', valeur: 250 }, 
  ];

  const handleValidate = () => {
    setLoading(true);
    
    const labels = staticData.map(stat => stat.libelle);
    const values = staticData.map(stat => stat.valeur);
    
    const dataset: Dataset = {
      label: 'Statistiques de Patrimoine',
      data: values,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 1,
    };

    setDataChart({
      labels: labels,
      datasets: [dataset],
    });

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <h1>Liste des Patrimoines</h1>
        <button onClick={handleValidate} style={{ padding: '10px 20px', fontSize: '12px', marginTop: '10px', border: '1px solid #333', backgroundColor: 'white', color: 'black', borderRadius: '4px'  }}>Valider</button>
        <h2 style={{ marginTop: '20px' }}>Statistiques</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {loading ? (
          <p>Chargement des données...</p>
        ) : dataChart.datasets.length > 0 && dataChart.datasets[0].data.length > 0 ? (
          <Line data={dataChart} />
        ) : (
          <p>Aucune donnée à afficher.</p>
        )}
      </div>

      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
    </div>
  );
};

export default GestionPatrimoine;