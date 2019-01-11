import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import warningUtils from '../../../utils/warningUtils';
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";

// Material UI components

// Icons

// Project components


const styles = makeStyles({
    root:{
        paddingTop: 10,
    },
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

    },
    statusBar:{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: 10,
        backgroundColor: 'var(--inactive)'
    },
    messageText:{
        padding: 10,

        '@media only screen and (max-width: 800px)': {
            width: '60%'        }
    },
    topright:{
        position: 'absolute',
        top: 4, right: 8,
    },
});

const StatusBox = (props) =>  {
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
                    <Paper elevation={1} square>
                        <div className={classes.messageText} >
                            <Typography className={classes.provincemessage} variant='caption'>
                                {props.province} har byttet status til "{<span className={statusClasses.textColor}>{props.statustekst}</span>}"
                            </Typography>
                            <Typography color='textSecondary' variant='caption'>
                                {props.statusMessage}
                            </Typography>
                            <Typography variant={"caption"} className={classes.topright}>
                                {time}
                            </Typography>
                        </div>
                        <div className={classNames(classes.statusBar, statusClasses.color)}/>

                    </Paper>
                </div>
            </div>
        </div>
    );
}

StatusBox.propTypes = {
    date: PropTypes.string,
    province: PropTypes.string,
    status: PropTypes.number,
    statusMessage: PropTypes.string,
    statustekst: PropTypes.string,

};

export default (StatusBox);