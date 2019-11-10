import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../utils/theme";
import LoginSignUp from "../LoginSignUp";
import TopBar from "../../components/TopBar";
import CreateRecipe from "../CreateRecipe";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectIsLoading } from "./selector";
import { getProfileAction, logoutAction } from "./actions";

export default function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logoutAction());
  const onLoginClick = () => history.push("/login");
  const onHome = () => history.push("/");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(getProfileAction());
  }, []);

  //TODO: use isLoading to show spinner
  return (
    <ThemeProvider theme={theme}>
      <TopBar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        onLogin={onLoginClick}
        onHome={onHome}
        inLoginPage={window.location.pathname === "/login"}
      />
      <section className="container">
        <CssBaseline />
        <Container maxWidth="lg">
          <Switch>
            <Route path="/create-recipe" component={CreateRecipe} />
            <Route exact path="/">
              <div>Home Page</div>
            </Route>
            <Route path="/login">
              <LoginSignUp isLoggedIn={isLoggedIn}></LoginSignUp>
            </Route>
          </Switch>
        </Container>
      </section>
    </ThemeProvider>
  );
}
