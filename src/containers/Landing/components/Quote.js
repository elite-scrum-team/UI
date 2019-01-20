import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
    root: {
        backgroundColor: 'whitesmoke',
        padding: 48,
        minHeight: 200,

        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        height: '100%',
        maxWidth: 800,
        margin: 'auto',
    },
    text: {
        '@media only screen and (max-width: 600px)': {
            fontSize: '1.3rem',
        }
    }
});

const Quote = (props) => {
 
    const classes = styles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography className={classes.text} variant='h5' >
                    <i>"Kommunen min har aldri vært så problemfri på flere tiår på grunn av HverdagsHelt. HverdagsHelt
                    gjør det så lett å varsle min kommune og følge med på løsningsprosessen."</i>
                </Typography>
                <Typography variant='caption' align='right'>Anonym</Typography>
            </div>
        </div>
    )
}

export default (Quote);