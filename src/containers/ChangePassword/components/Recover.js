import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import classNames from 'classnames';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import SendIcon from '@material-ui/icons/Send';

// Project components

const styles = makeStyles({
    root: {
        height:'auto',
        width: 'auto',
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px 20px 20px'
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',

    },
    button:{
        width:'100px',
        alignSelf:'flex-end'
    },
     paddings:{
         padding:'10px 0 10px 0'
     }
});

const handleEvent = (email) =>{
    console.log(email);
    // ADD LOGIC HERE!
};

const Recover = props => {
    // State
    const [value, setValue] = useState('');

    // Styling
    const classes = styles();

    return (
        <Paper className={classNames(classes.root, props.className)}>
            <div className={classes.wrapper}>
                <Typography variant='h5' className={classes.paddings}>
                    Find Your Account
                </Typography>
                <Divider/>
                <Typography variant='h6' className={classes.paddings}>
                    Please enter your email so we can send you another password
                </Typography>

                <TextField
                    id="outlined-full-width"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={value} onChange={(e) => setValue(e.target.value)}
                />

                <div className={classNames(classes.container, classes.paddings)}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => handleEvent(value)}>
                        Send
                        <SendIcon/>
                    </Button>
                </div>
            </div>
        </Paper>
    )
};

export default Recover;
