/**
 *
 * LoginPage
 *
 */

import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import TabPanel from "../../components/TabPanel";
import LoginComponent from "../../components/Login";
import SignupComponent from "../../components/SignUp";
import Paper from "@material-ui/core/Paper";
import { loginAction, registerAction } from "./actions";
import {
  selectIsLoading,
  selectLoginError,
  selectRegisterError
} from "./selector";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: "500px",
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

function LoginSignup(props) {
  const {
    onLogin,
    onRegister,
    isLoading,
    loginError,
    registerError,
    location,
    isLoggedIn
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location }
        }}
      />
    );
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Paper elevation={5}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
            aria-label="full width tabs example"
          >
            <Tab label="Login" icon={<LockOutlinedIcon />} />
            <Tab label="Sign Up" icon={<AccountCircleIcon />} />
          </Tabs>
        </Paper>
      </AppBar>
      <Paper elevation={5}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <LoginComponent
              onSubmit={onLogin}
              isLoading={isLoading}
              authError={loginError}
              onSwitch={handleChange}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <SignupComponent
              onSubmit={onRegister}
              authError={registerError}
              onSwitch={handleChange}
            />
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  loginError: selectLoginError(state),
  registerError: selectRegisterError(state)
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (...params) => dispatch(loginAction(...params)),
    onRegister: (...params) => dispatch(registerAction(...params))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LoginSignup);
