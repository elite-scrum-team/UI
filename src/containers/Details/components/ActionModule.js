import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components

// Icons

// Project components

const styles = makeStyles({
    root: {
        
    }
});

const ActionModule = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            
        </div>
    )
}

ActionModule.propTypes = {
    
}

export default (ActionModule);