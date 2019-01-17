import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import URLS from "./URLS";
import {Provider} from 'react-redux';
import store from './store/store';

// Theme
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

// Service imports
import AuthService from './api/services/AuthService';

// Project components
import LogIn from './containers/LogIn';
import Landing from './containers/Landing';
import Recover from './containers/ChangePassword'
import CreateWarning from './containers/CreateWarning';
import Details from './containers/Details';
import Dashboard from './containers/Dashboard';

// The user needs to be authorized (logged in) to access these routes
const EmployeeRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
            (AuthService.isAuthenticated() && AuthService.isEmployee())?
                <Component {...props} /> :
                <Redirect to={URLS.login} />
        )}
      />
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
            (AuthService.isAuthenticated())?
                <Component {...props} /> :
                <Redirect to={URLS.login.concat('?', rest.path ? 'redirect='.concat(rest.path) : '')} />
        )}
      />
    );
};

class App extends Component {

    componentDidMount() {
        if(AuthService.isAuthenticated()) {
            AuthService.getUserData();
        }
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter >
                        <MuiThemeProvider theme={theme}>
                            <Switch>
                                <Route exact path={URLS.details.concat(':id')} component={Details} />
                                <Route exact path={URLS.recover} component={Recover} />
                                <Route exact path={URLS.home} component={Landing} />
                                <Route exact path={URLS.login} component={LogIn} />
                                <PrivateRoute exact path={URLS.createwarning} component={CreateWarning} />
                                <EmployeeRoute exact path={URLS.dashboard.concat(':id?')} component={Dashboard} />
                            </Switch>
                        </MuiThemeProvider>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
