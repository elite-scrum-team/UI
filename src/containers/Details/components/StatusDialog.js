import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components

// Icons

// Project components

const styles = makeStyles({
    root: {
        
    }
});

const StatusDialog = (props) => {
    // State
    const [open, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}

export default (StatusDialog);