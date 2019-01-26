import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import moment from 'moment';
import theme from '../../theme';

// Material UI components
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

// Icons
import CalendarIcon from '@material-ui/icons/CalendarToday';

// External components
import { DateRange as DR } from 'react-date-range';
// import {DateRangePicker} from 'material-date-range-picker';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Button } from '@material-ui/core';

const styles = makeStyles({
    root: {
        position: 'relative',
        height: 38,
    },
    picker: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        cursor: 'pointer',
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.3)',
        borderRadius: 4,
        padding: '2px 10px',
        width: 200,
        height: 32,
        color: 'hsl(0,0%,50%)',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    grow: {
        flexGrow: 1,
        lineHeight: 0,
    },
    icon: {
        borderLeft: '1px solid hsl(0,0%,80%)',
        paddingLeft: 6,
        color: 'hsl(0,0%,80%)',
        height: 20,
        width: 20,
    }
});

const DateRange = (props) => {
    
    // Styling
    const classes = styles();

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);

    const handleChange = (timeObject) => {
        setStartDate(timeObject.dates.startDate);
        setEndDate(timeObject.dates.endDate);
    }

    const onSubmit = () => {
        if(props.onChange) {
            props.onChange(startDate, endDate);
        }
        setShow(false);
    }

    return (
        <div className={classes.root}>
            <div className={classes.input} onClick={() => setShow(!show)}>
                <Typography className={classes.grow} variant='caption' color='inherit' align='center'>
                {moment(props.startDate).format('YYYY-MM-DD').toString()} - {moment(props.endDate).format('YYYY-MM-DD').toString()}
                </Typography>
                <CalendarIcon className={classes.icon}/>
            </div>
            <Modal className={classes.picker} open={show} onClose={() => setShow(false)}>
                <div className={classes.flex}>
                    <DR 
                        ranges={[{startDate , endDate, key: 'dates'}]}
                        onChange={handleChange}
                        color={theme.palette.primary.main}
                        rangeColors={[theme.palette.primary.main]}
                        options={{
                            color: theme.palette.primary.main
                        }}
                    />
                    <div className='p-5'>
                        <Button fullWidth variant='text' color='primary' onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

DateRange.propTypes = {
    startDate: PropTypes.objectOf(Date).isRequired,
    endDate: PropTypes.objectOf(Date).isRequired,
    onChange: PropTypes.func,
}

export default (DateRange);