import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import warningUtils from '../../../utils/warningUtils';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons

// Project Components
import Map from "../../../components/miscellaneous/Map";


const styles = makeStyles({
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    relative: {
        position: 'relative',
        paddingLeft: 10,
    },
    mr: {marginRight: 10},
    content: {
        height: '100%',
        width: '100%',

        display: 'grid',

        gridGap: '12px',
        gridTemplateColumns: '3fr 2fr',
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
        backgroundColor: 'var(--inactive)'
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
        border: '2px solid var(--progress)',
        padding: '12px 12px 12px 0',
        margin: 12,
    },
    mapDiv:{
        gridArea: 'map',
        width: '100%',
        minHeight: 250,
        height: '100%',
        position: 'relative',
    },
    mapWrapper: {
        height: '100%',
    },
});

const WarningDetails = (props) =>  {
    const classes = styles();

    // Converts the date to a more readable form
    const time = props.date ? moment(props.date).fromNow() : 'Ukjent';

    // Initialize status settings
    const statusCode = props.status  !== undefined && props.status >= 0 && props.status <= 3 ? props.status : 1;
    const statusName = warningUtils.statusNames[statusCode];
    const statusClasses = warningUtils.getStatusClasses(statusCode)(); 

    return (
        <div className={classes.root}>
            <div className={classes.relative}>
                <div className={classes.content}>
                    <div className={classes.details}>
                        <Typography variant='h3'>
                            {props.title}
                        </Typography>
                        <div className={classes.flex}>
                            <Typography className={classes.mr} variant='caption'>Publisert: {time}</Typography>
                            <Typography variant='caption'>Status: {statusName}</Typography>
                        </div>
                        <Typography variant='caption'>{props.province}</Typography>
                        <div className='mt-10 mb-10'>
                            <Typography variant='subtitle1'>{props.description}</Typography>
                        </div>
                    </div>
                    <div className={classes.status}>
                        <Typography variant='caption'>Nyeste oppdatering</Typography>
                        <div className={classNames(classes.statusWrapper,statusClasses.border)}>
                            {props.statusMessage}
                        </div>
                    </div>
                    <div className={classNames(classes.statusBar, statusClasses.color)}/>
                    <div className={classes.mapDiv}>
                        <div className={classes.mapWrapper}>
                            <Map className={classes.mapwindow} locations={[props.location]}/>
                        </div>
                    </div>
                </div>
            </div>                     
        </div>
    );
}

WarningDetails.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    province: PropTypes.string,
    status: PropTypes.number,
    statusMessage: PropTypes.string,

    description: PropTypes.string,
    location: PropTypes.object, // Lat lng
};

export default (WarningDetails);