import React from 'react';
import { makeStyles } from '@material-ui/styles';
import warningUtils from '../../utils/warningUtils';
import classNames from 'classnames';
import moment from 'moment';

// Material UI components
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        position: 'relative',
        padding: 14,
        marginBottom: 4,
    },
    statusBar: {
        position: 'absolute',
        top: 6,
        bottom: 6,
        left: 6,
        borderRadius: 4,
        width: 4,
    },
    content: {
        marginLeft: 12,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageWrapper: {
        maxWidth: 56,
        minWidth: 56,
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
    flex: {
        marginLeft: 12,
        display: 'flex',
        justifyContent: 'space-between',
    }
});

const WarningItem = (props) => {
    // Styling
    const classes = styles();

    const statusCode = (props.status !== 'undefined' && props.status >= 0 && props.status <= 4) ? props.status : 1;
    const statusClasses = warningUtils.getStatusClasses(statusCode)();

    const time = props.posted ? moment(props.posted).fromNow() : '';

    return (
        <ButtonBase className={classes.root} onClick={props.onClick}> 
            <Paper className={classes.paper}>
                <div className={classNames(classes.statusBar, statusClasses.color)} />
                <div className={classes.flex}>
                    <Typography variant='subtitle1' align='left'>{props.title}</Typography>
                    <Typography variant='caption' align='right'>{time}</Typography>
                </div>
                <div className={classes.content}>
                    <div>
                        <Typography variant='body2' align='left'>{props.description}</Typography>
                    </div>
                    <div>
                        {props.image &&
                        <div className={classes.imageWrapper}>
                            <img className={classes.image} src={props.image} alt={props.title} />
                        </div>
                        }
                    </div>
                </div>
            </Paper>
        </ButtonBase>
    )
};

export default (WarningItem);
