import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components

const styles = {
    root: {

    }
}

class Template extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

            </div>
        )
    }
}

export default withStyles(styles)(Template);