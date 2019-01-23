import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import TextField from '@material-ui/core/TextField';

// Icons

// Project components

const styles = makeStyles({
    root: {
        },
    description: {
        marginRight: '60px',
    },
});

const InputStep = (props) => {

    // Styling
    const classes = styles();

    const handleChange = name => event => {
        props.setInputCallback(event.target.value);
    };

    return (
        <div className={classes.description}>
            <TextField

                id='outlined-multiline-flexible'
                label={props.stepName}
                multiline
                rows={props.rows}
                fullWidth
                value={props.existingInput}
                onChange={handleChange(props.stepName)}
                margin='normal'
                helperText=''
                variant='outlined'
            />
        </div>
    )
}

export default (InputStep);