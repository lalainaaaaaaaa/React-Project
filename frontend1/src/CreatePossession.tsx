import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    input: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '300px',
    },
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: theme.spacing(2),
    },
}));

interface Possession {
    Libelle: string;
    Valeur: number;
    DateDebut: string;
    DateFin: string;
    Taux: number;
}

const CreatePossession = () => {
    const classes = useStyles();
    const [data, setdata] = useState<Possession>({
        Libelle: "",
        Valeur: 0,
        DateDebut: "",
        DateFin: "",
        Taux: 0,
      });

    const [taux, setTaux] = useState<number>(0);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setdata((data) => ({
            ...data,
            [name]: name === 'Valeur' || name === 'Taux' ? parseFloat(value) : value, 
        }));
    };    

    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/possession', data);
            
            navigate('/');
        } catch (error) {
            setError('Erreur lors de la soumission du formulaire. Veuillez réessayer.');
            console.error('Erreur lors de la soumission du formulaire:', error);
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
                            Menu du Patrimoine
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>

            <form className={classes.form} onSubmit={handleSubmit}>
                <input
                    className={classes.input}
                    type="text"
                    placeholder="Libelle"
                    name="Libelle"
                  value={data.Libelle}
                  onChange={handleChange}
                    required
                />
                <input
                    className={classes.input}
                    type="number"
                    placeholder="Valeur"
                    name="Valeur"
                    value={data.Valeur}
                    onChange={handleChange}
                    required
                />
                <input
                    className={classes.input}
                    type="date"
                    name="DateDebut"
                    value={data.DateDebut}
                    onChange={handleChange}
                    required
                />
                 <input
                    className={classes.input}
                    type="date"
                    name="DateFin"
                    value={data.DateFin}
                    onChange={handleChange}
                    required
                />
                <input
                    className={classes.input}
                    type="number"
                    placeholder="Taux"
                    name="Taux"
                    value={data.Taux}
                    onChange={handleChange}
                    required
                />
                <button className={classes.button} type="submit">
                    Créer Possession
                </button>
                {error && <p className={classes.error}>{error}</p>}
            </form>
        </div>
    );
};

export default CreatePossession;