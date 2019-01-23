import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useState, useEffect} from 'react';

// Material UI components
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

// Icons

// Project components

const styles = makeStyles({
    root: {},
    content: {
        display: 'grid',
        '@media only screen and (min-width: 601px)': {
            gridTemplateColumns: '1fr 2fr',
        },
        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '1fr',
        },
        gridGap: '14px',
    },
    container: {
        marginTop: 15,
        marginBottom: 15,
        maxWidth: 200,
    },
    fields: {
        maxWidth: 200,
        gridTemplateColumns: '1fr',
    },
    leftElement: {
        '@media only screen and (min-width: 601px)': {
            margin: 'auto',
        },
        '@media only screen and (max-width: 600px)': {
        },
        // display: 'inline-block',
        // position: 'absolute',
    },
});

const DurationStep = (props) => {
    // State
    const [includePeriod, setInclude] = useState(true);
    const [selectedPeriod, setPeriod] = useState({from: props.startTime, to: props.endTime});

    // Styling
    const classes = styles();

    useEffect(() => {
        setPeriod({from: props.startTime, to: props.endTime});
    }, [props.startTime]);

    const handleStartChange = () => event => {
        props.setStartTimeCallback(event.target.value);
        setPeriod({from: event.target.value})
    };

    const handleEndChange = () => event => {
        props.setEndTimeCallback(event.target.value);
        setPeriod({to: event.target.value})

    };

    const handleClick = () => {
        if (includePeriod) {
            setInclude(false);
            props.setStartTimeCallback(null);
            props.setEndTimeCallback(null);
        }
        else {
            setInclude(true);
            props.setStartTimeCallback(selectedPeriod.from);
            props.setEndTimeCallback(selectedPeriod.to);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.fields}>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local-1"
                            label="Fra"
                            type="datetime-local"
                            disabled={!includePeriod}
                            value={props.startTime}
                            className={classes.textField}
                            onChange={handleStartChange()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="datetime-local-2"
                            label="Til"
                            type="datetime-local"
                            disabled={!includePeriod}
                            value={props.endTime}
                            className={classes.textField}
                            onChange={handleEndChange()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </div>
                <div className={classes.leftElement}>
                    <Button variant="contained" size={'large'} color='primary'
                            className={classes.registerButton}
                            onClick={() => handleClick()}
                    >
                        {includePeriod ? 'Ekskluder periode' : 'Inkluder periode'}
                    </Button>
                </div>
            </div>
        </div>
    )
};

DurationStep.propTypes = {
    setStartTimeCallback: PropTypes.func,
    setEndTimeCallback: PropTypes.func,
};

export default (DurationStep);