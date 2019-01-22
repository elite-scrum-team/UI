import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import URLS from '../../../URLS';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons
import FeedbackIcon from '@material-ui/icons/Feedback';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';

// Project components

const styles = makeStyles({
    root: {
        backgroundColor: '#009688',
        padding: 48,
        minHeight: 200,
        color: 'white',

        '@media only screen and (max-width: 600px)': {
            paddingLeft: 6,
            paddingRight: 6,
        }
    },
    content: {
        maxWidth: 800,
        margin: 'auto',

        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '24px 12px',
        maxWidth: 400,

        '@media only screen and (max-width: 600px)': {
            padding: '0px 2px',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',

            maxWidth: '90vw',
            overflow: 'hidden',
        }
    },
    button: {
        width: 176,
        padding: '6px 8px',

        '@media only screen and (max-width: 600px)': {
            fontSize: '0.8rem',
            padding: '6px 6px',
            width: 140,
        }
    },
});

const Starter = (props) => {

    // Styling
    const classes = styles();

    const scrollToTop = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography className={classes.text} variant='h4' color='inherit' align='center' >
                    Hvor starter du?
                </Typography>
                <div className={classes.buttonWrapper}>
                    <Button className={classes.button} onClick={() => props.goTo(URLS.createwarning)} variant='outlined' size='large' color='inherit'>Send varsel<FeedbackIcon className='ml-5' /></Button>
                    <Button className={classes.button} onClick={() => props.goTo(URLS.login.concat('?register=true'))} variant='outlined' size='large' color='inherit'><PersonIcon className='mr-5'/>Registrer</Button>
                </div>
                <div>
                    <Button variant='contained' color='secondary' onClick={scrollToTop}>Se varsler i din kommune</Button>
                </div>
            </div>
        </div>
    )
}

Starter.propTypes = {
    goTo: PropTypes.func.isRequired,
}

export default (Starter);