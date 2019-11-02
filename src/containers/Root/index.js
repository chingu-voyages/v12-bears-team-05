import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../utils/theme";
import LoginSignUp from "../LoginSignUp";
import ConnectedTopBar from "../ConnectedTopBar";
import CreateRecipe from "../CreateRecipe";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConnectedTopBar />
      <section className="container">
        <CssBaseline />
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={() => <div></div>} />
            <Route path="/login" component={LoginSignUp} />
            <Route path="/create-recipe" component={CreateRecipe} />
          </Switch>
        </Container>
      </section>
    </ThemeProvider>
  );
}
