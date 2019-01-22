import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import URLS from "../../URLS";

// Material UI components
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Service import
import AuthService from "../../api/services/AuthService";

// External imports

// Project Components
import Profile from "./components/Profile";
import Navigation from "../../components/navigation/Navigation";

const styles = theme => ({
    top: {
        width: '100%',
        minHeight: 75,
        backgroundColor: theme.palette.primary.main,
    },
    topContent: {
        maxWidth: 1000,
        display: 'block',
        margin: 'auto',
        padding: '18px 6px 0 6px',
        color: 'white',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
    },
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
    },
});

class MyProfile extends Component {
    state = {
        isSignIn: true,
        isLoading: false,
        errorMessage: '',
        userData: {},
    };

    componentDidMount() {
        console.log(this.props.location);
        if(!AuthService.isAuthenticated()) {
            this.props.history.replace(URLS.login);
        } else {
            AuthService.getUserData((isError, data) => {
                if(isError === false) {
                    this.setState({userData: data});
                }
            });
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
        AuthService.changePassword(password, (isError, data) => {
            if (isError) {
                this.setState({
                    errorMessage: "unauthorized"
                });
                console.log(data);
            }
            this.setState({isLoading: false});
        });
    };

    render() {
        const { classes } = this.props;
        
        const email = (this.state.userData ? this.state.userData.email : '') || '';

        return (
            <Navigation>
                <div className={classes.top}>
                    <div className={classes.topContent}>
                        {this.state.userData &&
                        <div className={classes.flex}>
                            <Typography variant='body2' align='right' color='inherit'>
                                {email}
                            </Typography>
                            <Avatar className='mr-10'>{(email.length > 0 ? email[0] : 'A').toUpperCase()}</Avatar>
                        </div>}
                    </div>
                </div>
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
