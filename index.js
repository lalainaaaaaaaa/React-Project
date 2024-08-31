
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


const possessions = [
  { libelle: 'Possession 1', valeur: 10000, dateDebut: '2024-01-01', dateFin: null, taux: 5 },
  { libelle: 'Possession 2', valeur: 20000, dateDebut: '2024-02-01', dateFin: null, taux: 10 },
];


app.get('/api/possessions', (req, res) => {
  res.json(possessions);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});