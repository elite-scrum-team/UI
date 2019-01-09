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


const styles = theme => ({
    root: {
        position: 'relative',
        paddingLeft: 10,
    },
    content: {
        height: '100%',
        width: '100%',

        display: 'grid',

        gridGap: '12px',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateAreas: `'details map' 'status map'`,

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
            gridTemplateAreas: `'details' 'map' 'status'`,
        }
    },
    statusBar:{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: 10,
        backgroundColor: 'yellow'
    },
    details: {
        padding: 14,
        gridArea: 'details',
    },
    status:{
        gridArea: 'status',
        width: '100%',
        display: 'inline-block',
        textAlign: 'center'
    },
    statusWrapper: {
        border: '1px solid yellow',
        padding: '12px 12px 12px 0',
        margin: 12,
    },
    mapDiv:{
        gridArea: 'map',
        width: '100%',
        height: 250,
        position: 'relative',
    },
    mapWrapper: {
        height: '100%',
    }
});

function MainDetail(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1} borderLeft={6} clone>
                <div className={classes.content}>
                    <div className={classes.details}>
                    <Typography variant="h5" component="h3">
                        {props.title}
                    </Typography>
                    <Typography variant='caption'>
                        Publisert: {props.date}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        Status: {props.status}
                        <br/>
                        {props.province}
                    </Typography>
                    </div>
                    <div className={classes.status}>
                        <div className={classes.statusWrapper}>
                            {props.statusMessage}
                        </div>
                    </div>
                    <div className={classes.statusBar}/>
                    <div className={classes.mapDiv}>
                        <div className={classes.mapWrapper}>
                            <Map className={classes.mapwindow}/>
                        </div>
                    </div>
                    </div>
            </Paper>
        </div>
    );
}

MainDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDetail);