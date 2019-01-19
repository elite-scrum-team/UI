import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Button from '@material-ui/core/Button';

// Icons

// Project components

const styles = makeStyles({
    root: {
        color: 'white',
    }
});

const URIButton = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Button
                className={props.className}
                variant={props.variant || 'text'}
                size='small'
                color='inherit'
                onClick={() => props.goTo(props.to)}
                >
                {props.icon}
                {props.label}
                </Button>
        </div>
    )
}

URIButton.propTypes = {
    to: PropTypes.string.isRequired,
    goTo: PropTypes.func.isRequired,
    icon: PropTypes.any,
    label: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
}

export default (URIButton);