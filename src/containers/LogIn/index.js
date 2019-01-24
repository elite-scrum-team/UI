import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import URLS from "../../URLS";

// Material UI components
import Paper from "@material-ui/core/Paper";
import SignIn from "./components/SignIn";
import Tabs from "./components/Tabs";
import Register from "./components/Register";
import Logo from "./components/Logo";
import Progress from "./components/Progress";

// Service import
import AuthService from "../../api/services/AuthService";

// External imports
import queryString from 'query-string'

// Project Components
import MessageDialog from '../../components/miscellaneous/MessageDialog';

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: 6,
    marginRight: 6,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  content: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

class LogIn extends Component {
  state = {
    isSignIn: true,
    isLoading: false,
    errorMessage: '',
    showEmailMessage: false,
  };

  componentDidMount() {
    console.log(this.props.location);
    if(AuthService.isAuthenticated()) {
      this.props.history.replace(URLS.discover);
    }

    // If in query params, init register
    const queryParams = queryString.parse(this.props.location.search);
    if(queryParams.register) {
      this.setState({isSignIn: false});
    }

  }

  changeTab = value => {
    this.setState({ isSignIn: value });
  };

  goTo = (page) => {
    this.props.history.push(page);
  };

  logIn = (email, password) => event => {
    event.preventDefault();

    // Set isLoading to true
    this.setState({ isLoading: true });

    AuthService.token(email, password, (isError, data) => {
      if (isError) {
        // Set error to true, and set errorMessage
        this.setState({
          errorMessage: "Feil brukernavn eller passord. Prøv igjen."
        });
      } else {
        // Go to home page
        const queryParams = queryString.parse(this.props.location.search);
        const urls = queryParams.redirect ? queryParams.redirect : URLS.discover;
        this.props.history.push(urls);
      }
      this.setState({ isLoading: false });
    });
  };

  reg = (email, password, confirm) => event => {
    event.preventDefault();

    // Check if password and confirmed password matches
    if (password !== confirm) {
      this.setState({
        errorMessage: "Passordene samsvarer ikke."
      });
      return;
    }

    // Register user
    this.setState({ isLoading: true });
    AuthService.createUser(email, password, (isError, data) => {
      if (isError) {
        this.setState({
          errorMessage: "the email address alrealy exists"
        });
      } else {
        /* const queryParams = queryString.parse(this.props.location.search);
        const urls = queryParams.redirect ? queryParams.redirect : URLS.discover;
        this.props.history.push(urls); */
        this.setState({showEmailMessage: true});
        
      }
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Logo onClick={() => this.goTo(URLS.home)}/>
            {this.state.isLoading ? (
              <Progress />
            ) : (
              <div className={classes.content}>
                <Tabs onChange={this.changeTab} isSignIn={this.state.isSignIn}/>
                {this.state.isSignIn ? (
                  <SignIn
                    logIn={this.logIn}
                    errorMessage={this.state.errorMessage}
                  />
                ) : (
                  <Register
                    reg={this.reg}
                    errorMessage={this.state.errorMessage}
                  />
                )}
              </div>
            )}
          </Paper>
        </main>
        <MessageDialog
          open={this.state.showEmailMessage}
          onClose={() => this.setState({showEmailMessage: false})}
          title='Sjekk din email'
          content='Vi har sendt et innloggingspassord på email. Bruk den for å logge inn, og eventuelt endre passordet når du kommer inn.'
          />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(LogIn));
