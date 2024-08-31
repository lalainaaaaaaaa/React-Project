import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:   
 1,
  },
  appBar: {
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none', // Hide menu button on larger screens
    },
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none', // Hide nav links on smaller screens
    },
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
  },
}));

const ResponsiveNavbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu   
 = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>   

      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"   

            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}> 

            Gestion de Patrimoine
          </Typography>
          <div className={classes.navLinks}>
            {}
            <a href="#" className={classes.navLink}>
              Possessions
            </a>
            <a href="#" className={classes.navLink}>
              Patrimoine
            </a>
          </div>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {/* Add navigation links for mobile menu */}
            <MenuItem onClick={handleCloseMenu}>Possessions</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Patrimoine</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ResponsiveNavbar;