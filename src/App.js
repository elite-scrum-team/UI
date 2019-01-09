import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import URLS from "./URLS";

// Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./index.css";

// Project components
import LogIn from "./containers/LogIn";
import Landing from "./containers/Landing";
import Recover from "./containers/ChangePassword";
import CreateWarning from "./containers/CreateWarning";
import Details from "./containers/Details";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route exact path={URLS.details} component={Details} />
              <Route exact path={URLS.recover} component={Recover} />
              <Route exact path={URLS.home} component={Landing} />
              <Route exact path={URLS.login} component={LogIn} />
              <Route
                exact
                path={URLS.createwarning}
                component={CreateWarning}
              />
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
