import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PossessionModel from '../../../../models/possessions/Possession.js'; 
import Flux from '../../../../models/possessions/Flux.js'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Possession() { 
  const [possessions, setPossessions] = useState([]);
  const [arrayResult, setArrayResult] = useState([]);
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [datePicker, setDatePicker] = useState('');
  const [editIndex, setEditIndex] = useState(null); 
  const [editValues, setEditValues] = useState({}); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json'); 
        const data = response.data;
        console.log('Data loaded:', data);

        if (data && data[1] && Array.isArray(data[1].data.possessions)) {
          instancing(data[1].data.possessions);
        } else {
          console.error('Data format issue:', data);
        }
      } catch (error) {
        console.error('Fetching data failed:', error);
      }
    };

    fetchData();
  }, []);

  function instancing(possessionsData) {
    console.log('Possessions data:', possessionsData);

    const newPossessions = possessionsData.map((oneData) => {
      if (oneData.libelle === "Alternance" || oneData.libelle === "Survie") {
        return new Flux(
          oneData.possesseur.nom,
          oneData.libelle,
          oneData.valeur,
          new Date(oneData.dateDebut),
          oneData.dateFin,
          oneData.tauxAmortissement || "0",
          oneData.jour,
          oneData.valeurConstante
        );
      }
      return new PossessionModel(
        oneData.possesseur.nom,
        oneData.libelle,
        oneData.valeur,
        new Date(oneData.dateDebut),
        oneData.dateFin,
        oneData.tauxAmortissement || 0
      );
    });
    console.log('New possessions:', newPossessions);
    setPossessions(newPossessions);
  }

  function getDatePicker(e) {
    setDatePicker(e.target.value);
    console.log('Selected date:', e.target.value);
  }

  function getNewValue() {
    if (!datePicker) {
      alert('Please select a date.');
      return;
    }
    const date = new Date(datePicker);

    const values = possessions.map((possession) =>
      possession.getValeurApresAmortissement(date)
    );

    const results = values.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    console.log('Calculated patrimoine value:', results);
    setPatrimoineValue(results);

    const updatedArrayResult = possessions.map((possession) =>
      possession.getValeurApresAmortissement(date)
    );
    console.log('Updated arrayResult:', updatedArrayResult);
    setArrayResult(updatedArrayResult);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditValues({
      libelle: possessions[index].libelle,
      valeur: possessions[index].valeur,
      tauxAmortissement: possessions[index].tauxAmortissement,
      dateDebut: possessions[index].dateDebut.toISOString().split('T')[0], 
    });
  }

  function handleSave(index) {
    const updatedPossessions = [...possessions];
    updatedPossessions[index] = {
      ...updatedPossessions[index],
      libelle: editValues.libelle,
      valeur: editValues.valeur,
      tauxAmortissement: editValues.tauxAmortissement,
      dateDebut: new Date(editValues.dateDebut), 
    };
    setPossessions(updatedPossessions);
    setEditIndex(null);
  }

  function handleChange(e, field) {
    setEditValues({ ...editValues, [field]: e.target.value });
  }

  function handleClose(index) {
    const updatedPossessions = [...possessions];
    updatedPossessions[index].dateFin = new Date(); 
    setPossessions(updatedPossessions);
  }

  function handleAddPossession() {
    const newPossession = new PossessionModel(
      "Nouveau Possesseur",
      "Nouveau Libellé",
      0, 
      new Date(), 
      null, 
      0 
    );
    setPossessions([...possessions, newPossession]);
  }

  function ShowList({ possessions, arrayResult }) {
    console.log('ShowList - Possessions:', possessions);
    console.log('ShowList - ArrayResult:', arrayResult);

    return (
      <tbody>
        {possessions.map((possession, i) => (
          <tr key={i}>
            {editIndex === i ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editValues.libelle}
                    onChange={(e) => handleChange(e, 'libelle')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editValues.valeur}
                    onChange={(e) => handleChange(e, 'valeur')}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={editValues.dateDebut} 
                    onChange={(e) => handleChange(e, 'dateDebut')}
                  />
                </td>
              </>
            ) : (
              <>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{possession.dateDebut.toDateString()}</td>
              </>
            )}
            <td>{possession.dateFin ? possession.dateFin.toDateString() : 'inconnue(s)'}</td>
            {editIndex === i ? (
              <td>
                <input
                  type="text"
                  value={editValues.tauxAmortissement}
                  onChange={(e) => handleChange(e, 'tauxAmortissement')}
                />
              </td>
            ) : (
              <td>{possession.tauxAmortissement}</td>
            )}
            <td>{arrayResult[i] !== undefined ? arrayResult[i] : 'N/A'}</td>
            <td>
              {editIndex === i ? (
                <button
                  type="button"
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleSave(i)}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleClose(i)}
              >
                Close
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header className="text-center py-3 border-bottom">
        <h1>Patrimoine-Economique</h1>
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={handleAddPossession} 
        >
          Ajouter Nouvelle Possession
        </button>
      </header>
      <main className="flex-grow-1">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="header">Libelle</th>
              <th scope="header">Valeur Libellé</th>
              <th scope="header">Date de début</th>
              <th scope="header">Date de fin</th>
              <th scope="header">Amortissement</th>
              <th scope="header">Valeur actuelle</th>
              <th scope="header">Actions</th>
            </tr>
          </thead>
          <ShowList possessions={possessions} arrayResult={arrayResult} />
        </table>
      </main>
      <footer className="inputContainer d-flex justify-content-between align-items-center p-3 border-top">
        <div className="input-group mb-3">
          <span className="input-text">DatePICKER</span>
          <input
            type="date"
            className="form"
            onChange={getDatePicker}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={getNewValue}
        >
          VALIDER
        </button>
        <div className="results">
          VALEUR DU PATRIMOINE : {patrimoineValue} MDG
        </div>
      </footer>
    </div>
  );
}

export default Possession;