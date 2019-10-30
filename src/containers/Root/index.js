import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../utils/theme";
import LoginSignUp from "../LoginSignUp";
import ConnectedTopBar from "../ConnectedTopBar";
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
          </Switch>
        </Container>
      </section>
    </ThemeProvider>
  );
}
