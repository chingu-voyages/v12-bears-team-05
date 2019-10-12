import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import TopBar from "../../components/TopBar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../utils/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar></TopBar>
      <Container maxWidth="lg" className="container">
        {/* <Switch>
          <Route exact path="/" component />
          <Route component />
        </Switch> */}
        <div> Container </div>
      </Container>
    </ThemeProvider>
  );
}
