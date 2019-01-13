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

const DescriptionStep = (props) => {

    // Styling
    const classes = styles();

    const handleChange = name => event => {
        props.setDescriptionCallback(event.target.value);
    };

    return (
        <div className={classes.description}>
            <TextField

                id='outlined-multiline-flexible'
                label='Beskrivelse'
                multiline
                rows='3'
                fullWidth
                value={props.multiline}
                onChange={handleChange('Beskrivelse')}
                margin='normal'
                helperText=''
                variant='outlined'
            />
        </div>
    )
}

export default (DescriptionStep);