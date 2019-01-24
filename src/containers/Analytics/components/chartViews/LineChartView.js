import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons

// Project components

// External imports
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const styles = makeStyles({
    root: {
        minHeight: 300,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    progress: {
        display: 'block',
        margin: 'auto',
    }
});

const LineChartView = (props) => {

    // Styling
    const classes = styles();
    const label = props.label || '';

    return (
        <Paper className={classNames(classes.root, props.className)}>
            <div className='p-30'>
                <Typography variant='h4' align='center'>{label}</Typography>
            </div>
            <div className={classes.grow}>
                <div className='w-100'>
                    {props.isLoading ? <CircularProgress className={classes.progress} /> :
                    <LineChart data={props.data || {}} />
                    }
                </div>
            </div>
        </Paper>
    )
}

LineChartView.propTypes = {
    label: PropTypes.string,
}

export default (LineChartView);