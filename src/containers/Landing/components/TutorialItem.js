import React, {Component} from 'react';
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
        padding: '22px 0',

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
        width: 175,
        height: 175,
    },
    description: {
        maxWidth: 360,
    }
});

const TutorialItem = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.item, props.reverse ? classes.reverse : '')}>
            <img className={classes.image} src={props.image} alt='Problem' />
            <div className={classes.description}>
                <Typography variant='h6'>{props.title}</Typography>
                <Typography variant='subtitle2'>{props.description}</Typography>
            </div>
        </div>
    )
}

export default (TutorialItem);