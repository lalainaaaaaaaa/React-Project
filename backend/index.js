const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json("possessions");
});

// Route pour obtenir les possessions
app.get('/api/possession', async (req, res) => {
    try {
        const possessions = await prisma.possessions.findMany();
        res.json(possessions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des possessions' });
    }
});

// Route pour ajouter une nouvelle possession
app.post('/api/possession', async (req, res) => {
    const { Libelle, Valeur, DateDebut, DateFin, Taux } = req.body;
    try {
        const newPossession = await prisma.possessions.create({
            data: { Libelle, Valeur, DateDebut, DateFin, Taux },
        });
        res.status(201).json(newPossession);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de la possession' });
    }
});

// Route pour modifier une possession
app.put('/api/possession/:id', async (req, res) => {
    const { id } = req.params;
    const { Libelle, Valeur, DateDebut, DateFin, Taux } = req.body;
    try {
        const updatedPossession = await prisma.possessions.update({
            where: { id: parseInt(id) },
            data: { Libelle, Valeur, DateDebut, DateFin, Taux },
        });
        res.json(updatedPossession);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la possession' });
    }
});

// Route pour supprimer une possession
app.delete('/api/possession/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.possessions.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la suppression de la possession' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
