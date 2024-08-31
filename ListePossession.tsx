import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


interface Possession {
  libelle: string;
  valeur: number;
  dateDebut: string;
  dateFin: string | null;
  taux: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  table: {
    width: '100%',
    maxWidth: '800px',
    overflowX: 'auto',
    marginTop: theme.spacing(2),
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ccc',
    borderRight: '1px solid #ccc', 
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200], 
  },
  td: {
    borderBottom: '1px solid #ccc',
    borderRight: '1px solid #ccc', 
    padding: theme.spacing(2), 
    textAlign: 'left',
    verticalAlign: 'middle', 
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '10px 0',
  },
  button: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
  },
}));

const ListPossession: React.FC = () => {
  const classes = useStyles();
  const [possessions, setPossessions] = useState<Possession[]>([]);

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/possessions');
        console.log(response.data);
        setPossessions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des possessions:', error);
      }
    };
    fetchPossessions();
  }, []);

  const handleCloseAll = async () => {
    try {
      await Promise.all(
        possessions.map((possession) =>
          axios.post(`http://localhost:5000/possession/${possession.libelle}/close`)
        )
      );
      setPossessions([]);
    } catch (error) {
      console.error('Erreur lors de la fermeture de toutes les possessions:', error);
    }
  };

  const handleDelete = async (libelle: string) => {
    try {
      await axios.delete(`http://localhost:5000/possession/${libelle}`);
      setPossessions(possessions.filter((p) => p.libelle !== libelle));
    } catch (error) {
      console.error(`Erreur lors de la suppression de la possession ${libelle}:`, error);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Gestion de Patrimoine
          </Typography>
          <div className={classes.navLinks}>
            <Link to="/possessions" className={classes.navLink}>
              Menu des Possessions
            </Link>
            <Link to="/patrimoine" className={classes.navLink}>
              Menu duPatrimoine
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <h1>Liste des Possessions</h1>
        <div className={classes.buttonContainer}>
          <Link to="/possession/create">
            <Button variant="contained" color="primary" className={classes.button}>Créer Possession</Button>
          </Link>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseAll}
            className={classes.button}
          >
            Fermer Toutes
          </Button>
        </div>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Libelle</th>
              <th className={classes.th}>Valeur</th>
              <th className={classes.th}>Date Début</th>
              <th className={classes.th}>Date Fin</th>
              <th className={classes.th}>Taux</th>
              <th className={classes.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {possessions.map((possession) => (
              <tr key={possession.libelle}>
                <td className={classes.td}>{possession.libelle}</td>
                <td className={classes.td}>{possession.valeur}</td>
                <td className={classes.td}>{possession.dateDebut}</td>
                <td className={classes.td}>{possession.dateFin}</td>
                <td className={classes.td}>{possession.taux}</td>
                <td className={classes.td}>
                  <div className={classes.actions}>
                    <Link to={`/possession/${possession.libelle}/update`}>
                      <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                        MODIFIER
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(possession.libelle)}
                    >
                      SUPPRIMER
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ListPossession;