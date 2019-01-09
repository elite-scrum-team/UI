import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import URLS from "./URLS";

// Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./index.css";

// Project components
<<<<<<< HEAD
import LogIn from "./containers/LogIn";
import Landing from "./containers/Landing";
=======
import LogIn from './containers/LogIn';
import Landing from './containers/Landing';
import Recover from './containers/ChangePassword'
import CreateWarning from './containers/CreateWarning';
import Details from './containers/Details'
>>>>>>> e7c14c0930885b95840dd7598314293d5a778b03

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
<<<<<<< HEAD
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route exact path={URLS.home} component={Landing} />
              <Route exact path={URLS.login} component={LogIn} />
            </Switch>
          </MuiThemeProvider>
=======
            <MuiThemeProvider theme={theme}>
                <Switch>
                  <Route exact path={URLS.details} component={Details} />
                  <Route exact path={URLS.recover} component={Recover} />
                  <Route exact path={URLS.home} component={Landing} />
                  <Route exact path={URLS.login} component={LogIn} />
                  <Route exact path={URLS.createwarning} component={CreateWarning} />


                </Switch>
            </MuiThemeProvider>
>>>>>>> e7c14c0930885b95840dd7598314293d5a778b03
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
