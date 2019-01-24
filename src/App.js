import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import URLS from './URLS';
import { Provider } from 'react-redux';
import store from './store/store';

// Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// Service imports
import AuthService from './api/services/AuthService';

// Project components
import LogIn from './containers/LogIn';
import Discover from './containers/Discover';
import Landing from './containers/Landing';
import Recover from './containers/ChangePassword';
import CreateWarning from './containers/CreateWarning';
import Details from './containers/Details';
import Dashboard from './containers/Dashboard';
import CreateNews from './containers/CreateNews';
import Events from './containers/Events';
import Profile from './containers/Profile';
import Statistics from './containers/Statistics';
import Analytics from './containers/Analytics';
import NotFound from './containers/NotFound';

// pointless comment
// The user needs to be authorized (logged in) to access these routes
const EmployeeRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
            (AuthService.isAuthenticated() && AuthService.isEmployee())?
                <Component {...props} /> :
                <Redirect to={URLS.login.concat('?', rest.path? 'redirect='.concat(rest.path):'')}  />
        )}
      />
    );
};

const CompEmployeeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() && AuthService.isCompanyOrEmployee() ? (
          <Component {...props} />
        ) : (
          <Redirect to={URLS.login} />
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={URLS.login.concat(
              '?',
              rest.path ? 'redirect='.concat(rest.path) : ''
            )}
          />
        )
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    if (AuthService.isAuthenticated()) {
      AuthService.getUserData();
    }
  }

<<<<<<< HEAD
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter >
                        <MuiThemeProvider theme={theme}>
                            <Switch>
                                <Route exact path={URLS.details.concat(':id')} component={Details} />
                                <Route exact path={URLS.recover} component={Recover} />
                                <Route exact path={URLS.discover} component={Discover} />
                                <Route exact path={URLS.home} component={Landing} />
                                <Route exact path={URLS.login} component={LogIn} />
                                <Route exact path={URLS.events} component={Events} />
                                <Route exact path={URLS.createnews.concat(':id?')} component={CreateNews} />
                                <Route exact path={URLS.statistics} component={Statistics} />
                                <PrivateRoute exact path={URLS.createwarning} component={CreateWarning} />
                                <CompEmployeeRoute exact path={URLS.dashboard.concat(':id?')} component={Dashboard} />
                            </Switch>
                        </MuiThemeProvider>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
=======
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <Switch>
                <Route
                  exact
                  path={URLS.details.concat(':id')}
                  component={Details}
                />
                <Route exact path={URLS.recover} component={Recover} />
                <Route exact path={URLS.discover} component={Discover} />
                <Route exact path={URLS.home} component={Landing} />
                <Route exact path={URLS.login} component={LogIn} />
                <Route exact path={URLS.events} component={Events} />
                <Route
                  exact
                  path={URLS.createnews.concat(':id?')}
                  component={CreateNews}
                />
                <Route exact path={URLS.profile} component={Profile} />
                <EmployeeRoute
                  exact
                  path={URLS.statistics}
                  component={Statistics}
                />
                <Route
                  exact
                  path={URLS.statistics.concat('2')}
                  component={Analytics}
                />
                <PrivateRoute
                  exact
                  path={URLS.createwarning}
                  component={CreateWarning}
                />
                <CompEmployeeRoute
                  exact
                  path={URLS.dashboard.concat(':id?')}
                  component={Dashboard}
                />
                <Route component={NotFound} />
              </Switch>
            </MuiThemeProvider>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
>>>>>>> 99858b387226ea73c1519ac1f52f5f047b430527
}

export default App;
