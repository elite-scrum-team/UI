import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI Components

// Icons

// Project Components

const styles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
});

const TemplateComponent = (props) => {
    // States
    const [count, setCount] = useState(0);

    // Styling
    const classes = styles();
    
    return (
        <div className={classes.root}>

        </div>
    )
}

export default (TemplateComponent);