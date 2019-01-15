import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';


// Material UI components
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";

// Icons

// Project components
import warningUtils from '../../../utils/warningUtils';

const styles = makeStyles({
    root:{
        marginTop: 10,
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
        top: 4, bottom: 4, left: 4,
        width: 4,
        borderRadius: 10,
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
    const statusCode = props.status  !== undefined && props.status >= 0 && props.status <= 4 ? props.status : 0;
    // const statusName = warningUtils.statusNames[statusCode];
    const statusClasses = warningUtils.getStatusClasses(statusCode)();

    return (
        <Paper className={classes.root}  elevation={1}>
            <div className={classes.relative}>
                <div className={classes.content}>
                    <div>
                        <div className={classes.messageText} >
                            <Typography className={classes.provincemessage} variant='caption'>
                                Status er byttet til "{<span className={statusClasses.textColor}>{props.statustekst}</span>}"
                            </Typography>
                            <Typography color='textSecondary' variant='caption'>
                                {props.statusMessage}
                            </Typography>
                            <Typography variant={"caption"} className={classes.topright}>
                                {time}
                            </Typography>
                        </div>
                        <div className={classNames(classes.statusBar, statusClasses.color)}/>

                    </div>
                </div>
            </div>
        </Paper>
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