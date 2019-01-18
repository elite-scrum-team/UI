import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import warningUtils from '../../utils/warningUtils';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import TimeIcon from '@material-ui/icons/AccessTime';

// Project components
import Map from "../miscellaneous/Map";


const styles = makeStyles({
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'row-reverse'
        }
    },
    relative: {
        position: 'relative',
        paddingLeft: 16,
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
        top: 10, bottom: 10, left: 8,
        borderRadius: 10,
        width: 3,
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
    topDetails: {
        display: 'flex',
        justifyContent: 'space-between',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'start',
            justifyCOntent: 'start',
        }
    }
});

const WarningDetails = (props) =>  {
    const classes = styles();

    // Converts the date to a more readable form
    const time = props.date ? moment(props.date).fromNow() : 'Ukjent';

    // Initialize status settings
    const statusCode = props.status  !== undefined && props.status >= 0 && props.status <= 4 ? props.status : 0;
    const statusName = warningUtils.statusNames[statusCode];
    
    let statusClasses = warningUtils.getAllStatusClasses;
    statusClasses = statusClasses.map((s) => s());
    statusClasses = statusClasses[statusCode];
    
    return (
        <div className={classes.root}>
            <div className={classes.relative}>
                <div className={classes.content}>
                    <div className={classes.details}>
                        <div className={classes.topDetails}>
                            <div>
                                <Typography variant='h3'>
                                    {props.title}
                                </Typography>
                                <div className='mt-10 mb-10'>
                                    <Chip className={statusClasses.color} label={'Status: '.concat(statusName)}></Chip>
                                </div>
                            </div>
                            <div>
                                <div className={classNames(classes.flex, 'mb-10')}>
                                    <Typography className={classes.mr} variant='caption'>{props.municipality} kommune</Typography>
                                    <LocationIcon />
                                </div>
                                <div className={classes.flex}>
                                    <Typography className={classes.mr} variant='caption'>{time}</Typography>
                                    <TimeIcon />
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 mb-10'>
                            <Typography variant='subtitle1'>{props.description}</Typography>
                        </div>
                    </div>
                    <div className={classes.status}>
                        <Typography variant='caption'>Nyeste oppdatering</Typography>
                        <div className={classNames(classes.statusWrapper,statusClasses.border)}>
                            {props.statusMessage || 'Ingen oppdateringer publisert'}
                        </div>
                    </div>
                    <div className={classNames(classes.statusBar, statusClasses.color)}/>
                    <div className={classes.mapDiv}>
                        <div className={classes.mapWrapper}>
                            <Map className={classes.mapwindow} defaultCenter={props.location} locations={[{location: props.location}]}/>
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
    municipality: PropTypes.string,
    status: PropTypes.number,
    statusMessage: PropTypes.string,

    description: PropTypes.string,
    location: PropTypes.object, // Lat lng
};

export default (WarningDetails);