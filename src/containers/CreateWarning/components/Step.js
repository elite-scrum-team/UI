import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },
    text: {
        marginLeft: 12,
    }
});

const TemplateComponent = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Avatar >{props.number}</Avatar>
            <div className={classes.text}>
                <Typography gutterBottom variant='h5' component='h2'>
                    {props.step}
                </Typography>
                <Typography variant='caption' component='p'>
                    {props.description}
                </Typography>
            </div>
        </div>
    )
}

export default (TemplateComponent);

