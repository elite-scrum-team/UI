import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
        height: 300,

        '&:hover': {
            borderRadius: 4,
            // boxShadow: '2px 1px 3px 0px rgba(0,0,0,0.5)',
            zIndex: 200,
            transform: 'scale(1.03)',
            
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

    },
    middle: {
        minHeight: 30,
    }
});

const EventItem = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.root, props.imageLeft ? '' : classes.reverse)}>
            <div className={classNames(classes.imageWrapper, props.imageLeft ? classes.fixedSize : classes.grow)}>
                <img className={classes.image} src={props.image} alt={props.title} />
            </div>
            <div className={classNames(classes.detailWrapper, props.imageLeft ? classes.grow : classes.fixedSize)}>
                <div className={classes.content}>
                    <Typography variant='h4'>도와 주세요</Typography>
                    <div className={classes.middle} />
                    <div className={classes.details}>
                        <div className={classes.flex}><TimeIcon className='mr-10' /><Typography variant='subtitle2'>Hello</Typography></div>
                        <div className={classes.flex}><LocationIcon className='mr-10' /><Typography variant='subtitle2'>Hello</Typography></div>
                        <div className={classes.flex}><CalendarIcon className='mr-10' /><Typography variant='subtitle2'>Hello</Typography></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (EventItem);