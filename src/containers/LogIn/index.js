import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material UI components
import Paper from "@material-ui/core/Paper";
import SignIn from "./components/SignIn";
import Tabs from "./components/Tabs";
import Register from "./components/Register";
import Logo from "./components/Logo";

// Service import
//import AuthService from "../../api/services/AuthService";

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
    isSignIn: true
  };

  changeTab = value => {
    this.setState({ isSignIn: value });
  };

  logIn = data => event => {
    event.preventDefault();

    const email = data.email;
    const password = data.password;

    //AuthService.token().then();

    console.log("Hello :D", email, password);
  };

  reg = event => {
    event.preventDefault();

    console.log("Hello :D");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Logo />
            <Tabs onChange={this.changeTab} />
            {this.state.isSignIn ? (
              <SignIn logIn={this.logIn} />
            ) : (
              <Register reg={this.reg} />
            )}
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(LogIn);
