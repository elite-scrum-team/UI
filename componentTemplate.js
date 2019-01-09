import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI Components

// Icons

// Project Components

const styles = makeStyles({
    root: {
        
    }
});

const TemplateComponent = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}

export default (TemplateComponent);