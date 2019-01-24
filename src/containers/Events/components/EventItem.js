import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import theme from '../../../theme';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationIcon from '@material-ui/icons/LocationOn';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import TimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '../../../assets/img/EventIcon.png';
import BankIcon from '@material-ui/icons/AccountBalance';

// Project components

const NORMAL_WIDTH = 250;

const styles = makeStyles({
    root: {
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: 'white',
        minHeight: 200,
        maxWidth: '100%',
        overflow: 'hidden',
        flexDirection: 'column',

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
    detailWrapper: {},
    content: {
        margin: 24,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',

        // justifyContent: 'space-between',
    },
    imageWrapper: {
        /*   height: 200,

          '@media only screen and (max-width: 1300)': {
              height: 'auto',
          } */
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    details: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 6,
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
        minHeight: 230,
        maxHeight: 230,
        overflow: 'hidden',
        //width: NORMAL_WIDTH,
        //maxWidth: NORMAL_WIDTH,

        '@media only screen and (max-width: 600px)': {
            width: '100%',
            maxWidth: 'none',
            minWidth: 'none',
        },
    },
    notFixed: {
        '@media only screen and (max-width: 1450px)': {
            width: '100%',
            maxWidth: 'none',
            minWidth: 'none',
        },
    },
    middle: {
        minHeight: 30,
    },
    icon: {
        marginRight: 10,
        padding: 0,
        height: 20,
        width: 20,
    },
    ellipsis: {
        position: 'relative',
        maxHeight: 70,
        overflow: 'hidden',
    },
    fade: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 10,
        background: 'linear-gradient(transparent, white)',
    },
    placeholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: theme.palette.primary.main,
    },
    placeholderImage: {
        padding: 20,
        height: 'auto',
        width: '50%',
        objectFit: 'cover',
    }
});

const EventItem = (props) => {
    // Styling
    const classes = styles();

    const fromObject = props.fromTime ? moment(props.fromTime) : null;
    const toObject = props.toTime ? moment(props.toTime) : null;

    let date = null;

    if (toObject !== null && fromObject !== null) {
        if (fromObject.format('DD/MM/YY') === toObject.format('DD/MM/YY')) {
            date = fromObject.format('DD/MM/YY');
        }
        else {
            console.log(12);
            date = fromObject.format('DD/MM/YY') + ' - ' + toObject.format('DD/MM/YY');
            console.log('date: ' + date);
        }
    }
    else {
        date = 'Pågående';
    }

    const time = (fromObject && toObject) ? fromObject.format('HH:mm') : 'Pågående';

    return (
        <Paper className={classNames(classes.root, props.imageLeft ? '' : classes.reverse, props.className)}
               onClick={props.onClick}>
            <div className={classNames(classes.imageWrapper,
                props.imageLeft ? classes.fixedSize : classes.grow,
                !props.image ? classes.placeholder : '', props.viewingDetail ? classes.notFixed : '')}>
                {props.image ? <img className={classes.image} src={props.image} alt={props.title}/>
                    :
                    <img className={classes.placeholderImage} src={EventIcon} alt={props.title}/>
                }
            </div>
            <div className={classNames(classes.detailWrapper, props.imageLeft ? classes.grow : classes.fixedSize)}>
                <div className={classes.content}>
                    <Typography variant='h5'>{props.title}</Typography>
                    <div className={classes.details}>
                        {time !== null &&
                        <div className={classes.flex}><TimeIcon className={classes.icon}/><Typography
                            variant='body2'>{time}</Typography></div>
                        }
                        <div className={classes.flex}><BankIcon className={classes.icon}/><Typography
                            variant='body2'>{props.municipality}</Typography></div>
                        <div className={classes.flex}><CalendarIcon className={classes.icon}/><Typography
                            variant='body2'>{date}</Typography></div>
                        <div className={classes.flex}><LocationIcon className={classes.icon}/><Typography
                            variant='body2'>{props.street !== 'null' ? props.street : 'Ukjent adresse'}</Typography>
                        </div>
                    </div>
                    {/* <div className={classes.ellipsis}>
                        <Typography  variant='subtitle2' noWrap={false}>{props.description}</Typography>
                        <div className={classes.fade} />
                    </div> */}
                    <div className={classes.middle}/>

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
