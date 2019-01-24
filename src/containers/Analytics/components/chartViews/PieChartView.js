import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

// External imports
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const styles = makeStyles({
    root: {
        padding: 20,
    }
});

const PieChartView = (props) => {

    // Styling
    const classes = styles();
    const label = props.label || '';

    return (
        <Paper className={classNames(classes.root, props.className)}>
            <div className='p-30'>
                <Typography variant='h4' align='center'>{label}</Typography>
            </div>
            <div>
                <div>
                    <PieChart data={{'2019-04-13': 2, '2019-04-14': 5, '2019-04-15': 4}} />
                </div>
            </div>
        </Paper>
    )
}

PieChartView.propTypes = {
    label: PropTypes.string,
}

export default (PieChartView);