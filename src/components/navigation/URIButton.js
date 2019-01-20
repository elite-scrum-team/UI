import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import Button from '@material-ui/core/Button';

// Icons

// Project components

const styles = makeStyles({
    root: {
        color: 'white',
    },
    underline: {
        borderBottom: '2px solid white',
    }
});

const URIButton = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.root, props.active ? classes.underline : '')}>
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