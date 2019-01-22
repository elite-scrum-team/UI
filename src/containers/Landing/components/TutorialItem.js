import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 0',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
        }
    },
    reverse: {
        flexDirection: 'row-reverse',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
        }
    },
    image: {
        width: 250,
        maxWidth: '100%',
        height: 'auto',
    },
    description: {
        maxWidth: 550,
    }
});

const TutorialItem = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.item, props.reverse ? classes.reverse : '')}>
            <img className={classes.image} src={props.image} alt='Problem' />
            <div className={classes.description}>
                <Typography variant='h5'>{props.title}</Typography>
                <br />
                <Typography variant='subtitle1'>{props.description}</Typography>
            </div>
        </div>
    )
}

export default (TutorialItem);