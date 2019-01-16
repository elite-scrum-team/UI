import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import URLS from '../../URLS';

// Service imports
import AuthService from '../../api/services/AuthService';

// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";

// Assets/Icons
import Add from '@material-ui/icons/Add';
import Logo from '../miscellaneous/Logo';

// Project components

const styles = {
    appbar: {
        height: 48,
    },
    main: {
        marginTop: 48,
    },
    leftMargin: {
      
      right: 'auto',
    },
    navContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logInButton: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
    },
    warningButton: {
        marginLeft: 24,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallIcon: {
        height: 16,
        width: 16,
    },
    SVGLogo: {
        fill: '#fff',
        height: '100%',
        width: '100%',
    },
    logoClicker:{
        alignItems: 'left',
        height: 50,
        width: 50
    }
};


class Navigation extends Component {

    goTo = (page) => {
        this.props.history.push(page);
    };

    logOut = () => {
        AuthService.logOut();
        this.props.history.push(URLS.home);
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classNames(classes.appbar, this.props.sidebar ? classes.leftMargin : '')} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} variant='dense'>
                        <div className={classes.logoClicker} >
                            <IconButton onClick={()=>this.goTo(URLS.home)}>
                                <Logo className={classes.SVGLogo}/>
                            </IconButton>
                        </div>
                        <div className={classes.flex}>

                            {AuthService.isEmployee() &&
                                    <Button
                                        className={classes.logInButton}
                                        size='small'
                                        onClick={() => this.goTo(URLS.dashboard)}>Dashboard</Button>
                            }
                            <div>
                                {AuthService.isAuthenticated()?
                                <Button
                                    className={classes.logInButton}
                                    size='small'
                                    onClick={this.logOut}>Logg ut</Button>
                                :
                                <Button
                                    className={classes.logInButton}
                                    size='small'
                                    onClick={() => this.goTo(URLS.login)}>Logg inn</Button>
                                }
                                
                            </div>
                            <div>
                                <Button
                                    className={classes.warningButton}
                                    size='small'
                                    variant='outlined'
                                    color='secondary'
                                    onClick={() => this.goTo(URLS.createwarning)}>Ny varsel <Add /></Button>
                            </div>
                        </div>
                        
                    </Toolbar>
                </AppBar>
                
                <main className={classNames(classes.main)}>
                    {(this.props.isLoading)? <LinearProgress /> : null}
                    <div>
                        {this.props.children}
                    </div>
                </main>
            </Fragment>
          );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node,
    isLoading: PropTypes.bool,
};

export default withStyles(styles)(withRouter(Navigation));
