import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// API and store imports

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';

// Assets/Icons

// Project Components

const styles = {
    root: {
        boxSizing: 'border-box',
        backgroundColor: 'var(--tihlde-blaa)',
        color: 'white',
        flexGrow: 1,
        zIndex: 10001,
    },
    main: {
        marginTop: 64,
        minHeight: '101vh',
        '@media only screen and (max-width: 600px)': {
            marginTop: 56,
        },
    },
    leftMargin: {
      left: 360,
    },
    navContent: {
        width: '100%',
    },
};


class Navigation extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <AppBar className={classNames(classes.root, this.props.sidebar ? classes.leftMargin : '')} position="fixed" color="primary">
                    <Toolbar className={classes.navContent} disableGutters>
                        <div>
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

    sidebar: PropTypes.object,
};

export default withStyles(styles)(Navigation);
