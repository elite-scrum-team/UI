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
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
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
    errorMessage: "",
  };

  componentDidMount() {
    console.log(this.props.location);
  }

  changeTab = value => {
    this.setState({ isSignIn: value });
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
        const urls = queryParams.redirect ? queryParams.redirect : URLS.home;
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
        const queryParams = queryString.parse(this.props.location.search);
        const urls = queryParams.redirect ? queryParams.redirect : URLS.home;
        this.props.history.push(urls);
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
            <Logo />
            {this.state.isLoading ? (
              <Progress />
            ) : (
              <div>
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
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(LogIn));
