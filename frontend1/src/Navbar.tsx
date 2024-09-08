import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
    display: 'flex',
    alignItems: 'center',
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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
    </div>
  );
};

export default Navbar;