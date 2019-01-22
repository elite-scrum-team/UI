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
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

// Assets/Icons
import Add from '@material-ui/icons/Add';
import Logo from '../miscellaneous/Logo';
import MenuIcon from '@material-ui/icons/Menu';

// Project components
import CompanyDropdown from '../miscellaneous/CompanyDropdown';
import URIButton from './URIButton';
import Sidebar from './Sidebar';

const styles = {
    appbar: {
        height: 48,
        zIndex: 1299,
    },
    main: {
        marginTop: 48,
    },
    noShadow: {
        boxShadow: 'none',
    },
    leftMargin: {
      left: 450,
      width: 'auto',
      '@media only screen and (max-width: 960px)': {
          left: 0,
          width: '100%',
      }
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
        borderColor: 'white',
    },
    menuButton: {
        color: 'white',
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
    logoWrapper: {
        minWidth: 50,
        minHeight: 50,
      height: 50,
      width: 50,
    },
    leftSection:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 50
    },
    companyDropdown: {
        alignSelf: 'start',
        textColor: '#fff',
        color: '#fff',
        width: 200,
    },
    sidebar: {
        zIndex: 100,
        minWidth: 200,
        width: '100vw',
        overflow: 'hidden',
    },
    behind: {
        zIndex: 1200,
    }
};


class Navigation extends Component {

    state = {
        showSidebar: false,
    };

    activeURI = () => this.props.match.path;

    goTo = (page) => {
        this.props.history.push(page);
    };

    logOut = () => {
        AuthService.logOut();
        this.props.history.push(URLS.home);
    };

    groupChange = (selection) => {
        if(this.props.selectGroup) {
            this.props.selectGroup(selection);
        }
    };

    goToHome = () => {
        if(this.props.match.url === URLS.discover) {
            this.goTo(URLS.home);
        } else {
            this.goTo(URLS.discover);
        }
    };

    toggleSidebar = () => {
        this.setState({showSidebar: !this.state.showSidebar});
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classNames(classes.appbar, this.props.sidebar ? classes.leftMargin : '',
                    this.props.noShadow ? classes.noShadow : '')}
                        position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} variant='dense'>
                        <div className={classes.leftSection} >
                            <div className={classes.logoWrapper}>
                            <IconButton onClick={this.goToHome}>
                                <Logo className={classes.SVGLogo}/>
                            </IconButton>
                            </div>
                            {
                                this.props.dashboard
                                &&
                                AuthService.isCompanyOrEmployee()
                                &&
                                <CompanyDropdown
                                    onChange={this.groupChange}
                                    className={classes.companyDropdown}/>
                            }
                        </div>
                        <Hidden implementation='js' smDown>
                            <div className={classes.flex}>
                                <URIButton
                                    goTo={this.goTo}
                                    to={URLS.discover}
                                    active={this.activeURI() === URLS.discover}
                                    label='Kart' />
                                <URIButton
                                    goTo={this.goTo}
                                    to={URLS.events}
                                    active={this.activeURI() === URLS.events}
                                    label='Nyheter' />
                                {AuthService.isEmployee() &&
                                    <Fragment>
                                        <URIButton
                                            active={this.activeURI() === URLS.statistics}
                                            goTo={this.goTo}
                                            to={URLS.statistics}
                                            label='Statistikk' />
                                    </Fragment>
                                }
                                {AuthService.isCompanyOrEmployee() &&
                                    <Fragment>
                                        <URIButton
                                            active={this.activeURI() === URLS.dashboard}
                                            goTo={this.goTo}
                                            to={URLS.dashboard}
                                            label='Dashboard' />
                                    </Fragment>
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
                                <URIButton
                                    className={classes.warningButton}
                                    goTo={this.goTo}
                                    to={URLS.createwarning}
                                    label='Ny varsel'
                                    variant='outlined'
                                    icon={<Add />} />
                            </div>
                        </Hidden>

                        <Hidden implementation='js' mdUp>
                            <IconButton className={classes.menuButton} onClick={this.toggleSidebar}><MenuIcon/></IconButton>

                            <Drawer
                                anchor='top'
                                open={this.state.showSidebar}
                                onClose={this.toggleSidebar}
                                classes={{
                                    paper: classes.sidebar,
                                    modal: classes.behind,
                                }}
                            >
                                <Sidebar onClose={this.toggleSidebar} logOut={this.logOut}/>
                            </Drawer>
                        </Hidden>
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
    sidebar: PropTypes.bool, // Adds leftMargin to the entire navbar
    noShadow: PropTypes.bool, // Disables appbar shadow
};

export default withStyles(styles)(withRouter(Navigation));
