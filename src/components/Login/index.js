import React, { memo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import useForm from "react-hook-form";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  validationErr: {
    fontStyle: "italic",
    fontSize: "0.875rem",
    color: "#f44336"
  },
  errorMessage: {
    marginTop: "30px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "4px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.875rem",
    backgroundColor: "#e91e63",
    color: "white",
    fontStyle: "italic"
  }
}));

const errorMap = {
  email: {
    regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Please enter a valid email address"
  },
  password: {
    regEx: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    message:
      "Password must be minimum 8 characters long and should have atleast 1 letter , 1 number and 1 special character"
  }
};

function SignIn(props) {
  const classes = useStyles();

  const { isLoading, onSubmit, onSwitch, authError } = props;
  const { register, handleSubmit, errors } = useForm({ mode: "onChange" });

  const handleOnSubmit = data => {
    const { email, password } = data;
    return onSubmit(email, password);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {authError && authError.message && (
          <Paper className={classes.errorMessage}>
            <Typography align="center" variant="body1">
              {authError.message}
            </Typography>
          </Paper>
        )}
        <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            error={!!errors.email}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            inputRef={register({
              required: "Please provide a email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            // value={state.fieldValue.email}
            // onChange={e => handleOnChange('email', e)}
            autoComplete="email"
            autoFocus
          />
          {errors && errors.email && (
            <span className={classes.validationErr}>
              {errors.email.message}
            </span>
          )}
          <TextField
            error={!!errors.password}
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // value={state.fieldValue.password}
            // onChange={e => handleOnChange('password', e)}
            autoComplete="current-password"
            inputRef={register({
              required: "Please provide a password"
            })}
          />
          {errors && errors.password && (
            <span className={classes.validationErr}>
              {errors.password.message}
            </span>
          )}
          <div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!!(errors.email || errors.password)}
            startIcon={<LockOutlinedIcon />}
            className={classes.submit}
          >
            {isLoading ? (
              <CircularProgress size={14} />
            ) : (
              <Typography>Login</Typography>
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={e => onSwitch(e, 1)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default memo(SignIn);
