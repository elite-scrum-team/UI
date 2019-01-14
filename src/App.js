import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import URLS from "./URLS";
import {Provider} from 'react-redux';
import store from './store/store';

// Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

// Project components
import LogIn from './containers/LogIn';
import Landing from './containers/Landing';
import Recover from './containers/ChangePassword'
import CreateWarning from './containers/CreateWarning';
import Details from './containers/Details';
import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter >
                    <MuiThemeProvider theme={theme}>
                        <Switch>
                            <Route exact path={URLS.details.concat(':warnID')} component={Details} />
                            <Route exact path={URLS.recover} component={Recover} />
                            <Route exact path={URLS.home} component={Landing} />
                            <Route exact path={URLS.login} component={LogIn} />
                            <Route exact path={URLS.createwarning} component={CreateWarning} />
                            <Route exact path={URLS.dashboard} component={Dashboard} />
                            <Route exact path={URLS.dashboard.concat(':warnID')} component={Dashboard} />
                        </Switch>
                    </MuiThemeProvider>
                </BrowserRouter>
            </div>
        </Provider>
    );
  }
}

export default App;
