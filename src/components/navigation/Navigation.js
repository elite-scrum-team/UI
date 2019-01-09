import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import URLS from '../../URLS';

// API and store imports

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// Assets/Icons

// Project Components

const styles = {
    appbar: {
        height: 48,
    },
    main: {
        marginTop: 48,
        '@media only screen and (max-width: 600px)': {
            marginTop: 56,
        },
    },
    leftMargin: {
      left: 360,
    },
    navContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logInButton: {
        color: 'white',
    }
};


class Navigation extends Component {

    goTo = (page) => {
        this.props.history.push(page);
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classes.appbar} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} variant='dense'>
                        <div>

                        </div>
                        <div>
                            <Button
                                className={classes.logInButton}
                                onClick={() => this.goTo(URLS.login)}>Logg inn</Button>
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
