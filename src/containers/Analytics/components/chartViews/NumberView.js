import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons

// Project components

const styles = makeStyles({
    root: {
        padding: 20,
    },
    progress: {
        display: 'block',
        margin: 'auto',
    }
});

const NumberView = (props) => {

    // Styling
    const classes = styles();
    const number = props.number || 0;
    const label = props.label || '';

    return (
        <Paper className={classes.root}>
            <div className='p-30'>
                {props.isLoading ? <CircularProgress className={classes.progress}/> :
                    <Typography variant='h2' align='center'>{number}</Typography>
                }
            </div>
            <div>
                <Typography variant='body2' align='center'>{label}</Typography>
            </div>
        </Paper>
    )
}

NumberView.propTypes = {
    number: PropTypes.number,
    label: PropTypes.string,
}

export default (NumberView);