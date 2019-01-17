import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components

// Icons

// Project components

// @MaterialUI
import Typography from "@material-ui/core/Typography"


const styles = makeStyles({
    root: {
        width: '80%',
        marginTop: 30,
        padding: 8,
    },
    flex: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    gray: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    }
});

const TextCard = (props) => {
    // Styling
    const classes = styles();

    return (
        props.text ? <div className={classNames(classes.root, props.gray ? classes.gray : '')}>
            <Typography>{props.text}</Typography>
        </div>
        : null
    )
};

export default (TextCard);
