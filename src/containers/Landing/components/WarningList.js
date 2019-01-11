import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import URLS from '../../../URLS';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components
import WarningItem from './WarningItem';


const styles = makeStyles({
    root: {
        padding: '10px 4px',
    }
});

const WarningList = (props) => {
    // Styling
    const classes = styles();

    const warnings = props.items || [];

    return (
        <div className={classes.root}>
            {warnings.map((value, index) => (
                <WarningItem
                    key={value.id || index}
                    onClick={() => props.goTo(URLS.details.concat(value.id))}
                    title={value.title}
                    status={value.status}
                    description={value.description}/>
            ))}
            {warnings.length === 0 && <Typography variant='subtitle1' align='center'>Ingen varsel å vise</Typography>}
        </div>
    );
};

WarningList.propTypes = {
    items: PropTypes.array,
    goTo: PropTypes.func,
}

WarningList.defaultProps = {
    goTo: () => {},
}

export default (WarningList);