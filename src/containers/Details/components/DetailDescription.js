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
import Map from "../../../components/miscellaneous/Map";
import {Description} from "@material-ui/icons";


const styles = theme => ({
    root: {
        position: 'relative',
        margin: 10,
    },
    content: {
        height: '100%',
        width: '100%',

        display: 'grid',
        objectFit: 'contain',

        gridGap: '12px',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateAreas: `'desc image'`,

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `'desc' 'image'`,
        },
    },
    description:{
        padding: 20,
        gridArea: 'desc',
    },
    image:{
        gridArea: 'image',
        height: 100,
        width: 100,
    }
});

function DetailDescription(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <div className={classes.content}>
                    <div className={classes.description}>
                        <Typography variant="h5" component="h3">
                            {props.description}
                        </Typography>
                    </div>
                    <div className={classes.image}>
                        <img src='https://i.imgur.com/VXMM1PI.png' alt='høl'/>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

DetailDescription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailDescription);