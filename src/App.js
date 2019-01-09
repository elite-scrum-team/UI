import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import URLS from './URLS';

// Theme
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import './index.css';

// Project components
import LogIn from './containers/LogIn';
import Landing from './containers/Landing';
import Details from './containers/Details'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Switch>
                    
                  <Route path={URLS.home} component={Landing} />
                  <Route path={URLS.login} component={LogIn} />
                  <Route exactpath={URLS.details} component={Details} />

                </Switch>
            </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
