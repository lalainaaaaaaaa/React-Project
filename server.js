const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let possessions = [];
let valeursPatrimoine = {};


app.get('/possession', (req, res) => {
    res.json(possessions);
});

app.post('/possession', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    const newPossession = { libelle, valeur, dateDebut, taux, dateFin };
    possessions.push(newPossession);
    res.status(201).json(newPossession);
});


app.put('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    const possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = dateFin;
        res.json(possession);
    } else {
        res.status(404).send('Possession not found');
    }
});

app.post('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    const possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date().toISOString();
        res.json(possession);
    } else {
        res.status(404).send('Possession not found');
    }
});


app.get('/patrimoine/:date', (req, res) => {
    const { date } = req.params;
    const valeur = valeursPatrimoine[date] || 0;
    res.json({ date, valeur });
});


app.post('/patrimoine/range', (req, res) => {
    const { type, dateDebut, dateFin, jour } = req.body;
    
    const valeur = Math.random() * 1000; 
    res.json({ valeur });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});