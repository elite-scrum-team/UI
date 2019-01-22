import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import URLS from "../../URLS";

// Material UI components
import Paper from "@material-ui/core/Paper";

// Service import
import AuthService from "../../api/services/AuthService";

// External imports
import queryString from 'query-string'

// Project Components
import Profile from "./components/Profile";
import Navigation from "../../components/navigation/Navigation";

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

class MyProfile extends Component {
    state = {
        isSignIn: true,
        isLoading: false,
        errorMessage: '',
        id: '',
    };

    componentDidMount() {
        console.log(this.props.location);
        if(!AuthService.isAuthenticated()) {
            this.props.history.replace(URLS.login);
        } else {
            this.setState({ id: AuthService.getUserData() });
        }

    }

    change = (password, confirm) => event => {
        event.preventDefault();

        // Check if password and confirmed password matches
        if (password !== confirm) {
            this.setState({
                errorMessage: "Passordene samsvarer ikke."
            });
            return;
        }

        // Change password
        this.setState({ isLoading: true });
        AuthService.changePassword(password, this.state.id, (isError, data) => {
            if (isError) {
                this.setState({
                    errorMessage: "the email address alrealy exists"
                });
                console.log(data);
            } else {
                const queryParams = queryString.parse(this.props.location.search);
                const urls = queryParams.redirect ? queryParams.redirect : URLS.discover;
                this.props.history.push(urls);
                this.setState({isLoading: false});
            }
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Navigation>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Profile
                            pass={this.change}
                            errorMessage={this.state.errorMessage}
                        />
                    </Paper>
                </main>
            </Navigation>
        );
    }
}

export default withStyles(styles)(withRouter(MyProfile));
