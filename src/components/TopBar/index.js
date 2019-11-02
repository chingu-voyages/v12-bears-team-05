/**
 *
 * TopBar
 *
 */

import React, { memo,Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Kitchen from '@material-ui/icons/Kitchen';
import LockOpen from '@material-ui/icons/LockOpen';
import { makeStyles } from "@material-ui/styles";
import Kitchen from "@material-ui/icons/Kitchen";
import LockOpen from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: '999999'
  },
  title: {
    flexGrow: 1,
    marginLeft: '20px'
  },

  loginButton: {
    // backgroundColor: "#00BCD4",
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  addRecipeButton: {
    backgroundColor: '#2e7d32',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1b5e20',
      color: 'white'
    }
  },
  signupButton: {
    marginLeft: '10px'
  },
  link: {
    textDecoration: 'none',
    marginRight: theme.spacing(1)
  },
  avatar: {
    margin: '30px',
    backgroundColor: theme.palette.secondary.main
  },
  productTitle: {
    textDecoration: 'none',
    color: 'white'
  },
  appBar: {
    background: 'linear-gradient(to right, #bc4e9c, #f80759)'
  }
}));

const TopBar = ({ isLoggedIn, onLogout, onLogin, inLoginPage, onHome }) => {
  const classes = useStyles();

  // let classes = {};
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Kitchen fontSize="large" />
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.productTitle}>
              Meal and Receipe tracker
            </Link>
          </Typography>
          {inLoginPage ? (
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              className={classes.loginButton}
              onClick={onHome}
            >
              Home
            </Button>
          ) : !isLoggedIn ? (
          <Button
              variant="contained"
              startIcon={<LockOpen />}
              className={classes.loginButton}
              onClick={onLogin}
            >
              Sign In
            </Button>
            
         
          ) : (
            <Fragment>
            <Button
              variant="contained"
              startIcon={<ExitToAppIcon />}
              className={classes.loginButton}
              onClick={onLogout}
            >
              Logout
            </Button>
          <Link to="/create-recipe" className={classes.link}>
            <Button
              variant="contained"
              startIcon={<LockOpen />}
              className={classes.addRecipeButton}
            >
              Create Recipe
            </Button>
            </Fragment>
          </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {};

export default memo(TopBar);
