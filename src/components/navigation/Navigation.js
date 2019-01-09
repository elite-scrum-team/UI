import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

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
        left: 120,
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
};


class Navigation extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classes.appbar} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} variant='dense'>
                        <div>
                            <Button>Log inn</Button>
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

export default withStyles(styles)(Navigation);
