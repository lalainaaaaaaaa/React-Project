import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { calculerStatistiques } from './Statistiques'; 

function PatrimoineCalculator() {
  const [biens, setBiens] = useState([]);
  const [dateCalcul, setDateCalcul] = useState(new Date());
  const [valeurTotale, setValeurTotale] = useState(0);
  const [nombreBiens, setNombreBiens] = useState(0);
  const [valeurMoyenne, setValeurMoyenne] = useState(0);
  const allBiens = localStorage.getItem("biens");
  const [l, setL] = useState(false);
  let tab = [];
  
  if (allBiens == null) {
    localStorage.setItem("biens", JSON.stringify([]));
  } else {
    tab = allBiens;
  }

  useEffect(() => {
    const allBiens = localStorage.getItem("biens");
    tab = allBiens;
    setBiens(JSON.parse(tab));
  }, [l]);

  const handleAddBien = () => {
    const nouveauBien = {
      libelle: "1 Ordinateur", 
      valeurInitiale: 2000000, 
      dateDebut: new Date(2021, 9, 26), 
      dateFin: new Date(2024, 4, 13),   
      tauxAmortissement: 0.1
    };

    let newTab = [...JSON.parse(tab), nouveauBien];
    localStorage.setItem("biens", JSON.stringify(newTab));
    setL(!l);
  };

  const calculerValeurActuelle = (bien) => {
    const { valeurInitiale, dateFin, tauxAmortissement } = bien;
    const dureeVieRestante = (new Date(dateFin) - dateCalcul) / (1000 * 60 * 60 * 24 * 365.25);
    const amortissementAnnuel = valeurInitiale * tauxAmortissement;
    const amortissementCumule = amortissementAnnuel * dureeVieRestante;
    const valeurActuelle = valeurInitiale - amortissementCumule;
    
    return valeurActuelle;
  };

  const calculerPatrimoine = () => {
    const valeurTotale = biens.reduce((total, bien) => {
      const valeurActuelle = calculerValeurActuelle(bien);
      return total + valeurActuelle;
    }, 0);

    setValeurTotale(valeurTotale);
    
    // Appel à la fonction de statistiques
    const { nombreBiens, valeurMoyenne } = calculerStatistiques(biens, valeurTotale);
    setNombreBiens(nombreBiens);
    setValeurMoyenne(valeurMoyenne);
  };

  return (
    <div>
      {/* Tableau des biens */}
      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Valeur actuelle</th>
          </tr>
        </thead>
        <tbody>

          {biens.map((bien, index) => (
            <tr key={index}>
              <td>{bien.libelle}</td>
              <td>{bien.valeurInitiale}</td>
              <td>{format(new Date(bien.dateDebut), 'dd/MM/yyyy')}</td>
              <td>{format(new Date(bien.dateFin), 'dd/MM/yyyy')}</td>
              <td>{bien.tauxAmortissement}</td>
              <td>{calculerValeurActuelle(bien).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* DatePicker */}
      <DatePicker
        selected={dateCalcul}
        onChange={(date) => setDateCalcul(date)}
        dateFormat="dd/MM/yyyy"
      />

      {/* Bouton Valider */}
      <button onClick={calculerPatrimoine}>Valider</button>

      {/* Résultat */}
      <p>Valeur totale du patrimoine : {valeurTotale.toFixed(2)}</p>
      <p>Nombre total de biens : {nombreBiens}</p>
      <p>Valeur moyenne des biens : {valeurMoyenne.toFixed(2)}</p>

      {/* Ajouter un bien (pour le test) */}
      <button onClick={handleAddBien}>Ajouter un Bien</button>
      <button onClick={() => {localStorage.setItem("biens", JSON.stringify([])); setL(!l);}}>Clear</button>
    </div>
  );
}

export default PatrimoineCalculator;