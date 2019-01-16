import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components

// Icons

// Project components

// @MaterialUI
import Typography from "@material-ui/core/Typography"


const styles = makeStyles({
    root: {
        width: '80%',
        paddingTop:'30px',
    },
    flex: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

const TextCard = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Typography>{props.text}</Typography>
        </div>
    )
};

export default (TextCard);
