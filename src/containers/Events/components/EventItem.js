import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimeIcon from '@material-ui/icons/AccessTime';

// Project components

const NORMAL_WIDTH = 250;

const styles = makeStyles({
    root: {
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: 'white',
        minHeight: 200,


        '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
            height: 'auto',
        },

        '&:hover': {
            // boxShadow: '2px 1px 3px 0px rgba(0,0,0,0.5)',
            borderRadius: 0,
        }
    },
    reverse: {
        flexDirection: 'row-reverse',
    },
    detailWrapper: {

    },
    content: {
        margin: 24,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',

        // justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    details: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 12,
        margin: '10px 0 20px 0',
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    fixedSize: {
        minWidth: NORMAL_WIDTH,
        width: NORMAL_WIDTH,
        maxWidth: NORMAL_WIDTH,

        '@media only screen and (max-width: 600px)': {
            width: '100%',
            maxWidth: 'none',
            minWidth: 'none',
        },
    },
    middle: {
        minHeight: 30,
    },
    ellipsis: {
        position: 'relative',
        maxHeight: 70,
        overflow: 'hidden',
    },
    fade: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 30,
        background: 'linear-gradient(transparent, white)',
    }
});

const EventItem = (props) => {
    // Styling
    const classes = styles();

    const momentObject = props.date ? moment(props.date) : null;
    const date = momentObject ? momentObject.calendar() : 'Ukjent';
    const time = momentObject ? momentObject.format('HH:mm') : 'Ukjent';

    return (
        <Paper className={classNames(classes.root, props.imageLeft ? '' : classes.reverse)}>
            <div className={classNames(classes.imageWrapper, props.imageLeft ? classes.fixedSize : classes.grow)}>
                <img className={classes.image} src={props.image} alt={props.title} />
            </div>
            <div className={classNames(classes.detailWrapper, props.imageLeft ? classes.grow : classes.fixedSize)}>
                <div className={classes.content}>
                    <Typography variant='h4'>{props.title}</Typography>
                    <div className={classes.details}>
                        <div className={classes.flex}><TimeIcon className='mr-10' /><Typography variant='subtitle2'>{time}</Typography></div>
                        <div className={classes.flex}><LocationIcon className='mr-10' /><Typography variant='subtitle2'>{props.location}</Typography></div>
                        <div className={classes.flex}><CalendarIcon className='mr-10' /><Typography variant='subtitle2'>{date}</Typography></div>
                    </div>
                    <div className={classes.ellipsis}>
                        <Typography  variant='subtitle2' noWrap={false}>{props.description}</Typography>
                        <div className={classes.fade} />
                    </div>
                    <div className={classes.middle} />

                </div>
            </div>
        </Paper>
    )
}

EventItem.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
}

export default (EventItem);
