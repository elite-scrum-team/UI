import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';


// Material UI components

// Icons

// Project components

const styles = makeStyles({
    root: {
        padding: '22px',
        backgroundColor: 'red',
    }
});

const TemplateComponent = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <input value={data.email} onChange={(e) => setData({email: e.target.value})} />
            <p>{data.email}</p>
        </div>
    )
}

export default (TemplateComponent);