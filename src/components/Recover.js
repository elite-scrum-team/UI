import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import classNames from 'classnames';

// Material UI Components
import Paper from '@material-ui/core/Paper';
// Icons

// Project Components

const styles = makeStyles({
    root: {
        height:'auto',
        width: 'auto',
    }
});

const recover = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <Paper className={classNames(classes.root, props.className)}>

        </Paper>
    )
};

export default (recover);
