import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI components

// Icons

// External components
import {DateRangePicker} from 'material-date-range-picker';

const styles = makeStyles({
    root: {
        
    }
});

const DateRange = (props) => {
    
    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <DateRangePicker
                fromDate={props.startDate}  //from date
                toDate={props.endDate}  //to Date
                onChange={props.onChange}
                closeDialogOnSelection    //close date dialog after selecting both from and to date
            />
        </div>
    )
}

export default (DateRange);