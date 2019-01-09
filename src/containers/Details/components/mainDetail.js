import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/es/styles/withStyles";

// Icons

// Project Components

const styles = theme => ({
    root: {
        position: 'relative',
    },
    content:{
        padding: '10px 10px 10px 20px',
        height: '100%',
        width: '100%',
    },
    statusBar:{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: 10,
        backgroundColor: 'red'
    }
});

function MainDetail(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1} borderLeft={6} clone>
                <div className={classes.content}>
                <Typography variant="h5" component="h3">
                    {props.title}
                </Typography>
                <Typography variant='subtitle2'>
                    Publisert: {props.date} &nbsp;&nbsp;&nbsp;&nbsp; Status: {props.status}
                    <br/>
                    {props.province}
                </Typography>
                <Typography component="p">
                    {props.description}
                </Typography>
                    <div className={classes.statusBar}/>
                </div>
            </Paper>
        </div>
    );
}

MainDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDetail);