import React, { memo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useForm from "react-hook-form";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
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

function SignUp(props) {
  const classes = useStyles();
  const {  onSubmit, onSwitch, authError } = props;

  const { register, handleSubmit, errors } = useForm({ mode: "onChange" });

  const handleOnSubmit = data => {
    const { name, email, password } = data;
    return onSubmit(name, email, password);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {authError && authError.message && (
          <Paper className={classes.errorMessage}>
            <Typography align="center" variant="body1">
              {authError.message}
            </Typography>
          </Paper>
        )}
        <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                error={!!errors.name}
                name="name"
                margin="normal"
                variant="outlined"
                // required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                inputRef={register({ required: "Please provide a name" })}
              />
              {errors && errors.name && (
                <span className={classes.validationErr}>
                  {errors.name.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={!!errors.email}
                margin="normal"
                // required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  required: "Please provide a email address",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please provide a valid email"
                  }
                })}
              />
              {errors && errors.email && (
                <span className={classes.validationErr}>
                  {errors.email.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={!!errors.password}
                margin="normal"
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: "Please provide a password",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "Password should be min 8 characters long and should be alpha numeric with a special character"
                  }
                })}
              />
              {errors && errors.password && (
                <span className={classes.validationErr}>
                  {errors.password.message}
                </span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={!!(errors.name || errors.email || errors.password)}
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AccountCircleIcon/>}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={e => onSwitch(e, 0)}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default memo(SignUp);
