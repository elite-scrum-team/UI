import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
    root: {
        backgroundColor: 'whitesmoke',
        padding: 48,
        minHeight: 200,
    },
    content: {
        maxWidth: 800,
        display: 'block',
        margin: 'auto',
    },
    text: {
        '@media only screen and (max-width: 600px)': {
            fontSize: '1.3rem',
        }
    }
});

const Quote = (props) => {
    // State
    const [open, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography className={classes.text} variant='h4' >
                    <i>"Kommunenen min har aldri vært så problemfri på flere tiår på grunn av HverdagsHelt. HverdagsHelt
                    gjør det så lett å varsle min kommune og følge med på løsninsgprosessen."</i>
                </Typography>
                <Typography variant='caption' align='right'>Anonym</Typography>
            </div>
        </div>
    )
}

export default (Quote);