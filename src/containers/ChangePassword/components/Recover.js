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
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import SendIcon from '@material-ui/icons/Send';

// Service import
import AuthService from '../../../api/services/AuthService'
import MessageDialog from "../../../components/miscellaneous/MessageDialog";

// Project components

const styles = makeStyles({
    root: {
        height:'auto',
        width: 'auto',
        minHeight: 250,
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
     },
    progress: {
        margin: '100px 180px 100px 180px',
    },
});

const handleEvent = (email, setErrorMessage, setIsLoading, setShowResetMessage, callback) =>{
    console.log(email);
    // ADD LOGIC HERE!
    if (!email) {
        setErrorMessage('Ingen email');
        return;
    }

    // Reset password
    setIsLoading(true);
    AuthService.resetPassword(email, (isError, data) => {
        if (isError) {
            setErrorMessage("Something went wrong");
            console.log(data);
        } else {
            setShowResetMessage(true);
        }
        setIsLoading(false);
        !callback || callback();
    });
};

const Recover = props => {
    // State
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResetMessage, setShowResetMessage] = useState(false);

    // Styling
    const classes = styles();

    return (
            <Paper className={classNames(classes.root, props.className)}>
                {isLoading ? (
                    <CircularProgress className={classes.progress} />
                ) : (
                    <form
                        className={classes.wrapper}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEvent(
                                value,
                                setErrorMessage,
                                setIsLoading,
                                setShowResetMessage
                            )
                        }}
                    >
                        <Typography variant='h5' className={classes.paddings}>
                            Find Your Account
                        </Typography>
                        <Divider/>
                        <Typography variant='h6' className={classes.paddings}>
                            Please enter your email so we can send you another password
                        </Typography>

                        <TextField
                            className={classes.text}
                            id="outlined-full-width"
                            label="Email"
                            style={{ margin: 0 }}
                            placeholder="Email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={value} onChange={(e) => setValue(e.target.value)}
                            helperText={errorMessage}
                        />

                        <div className={classNames(classes.container, classes.paddings)}>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={() => handleEvent(
                                        value,
                                        setErrorMessage,
                                        setIsLoading,
                                        setShowResetMessage
                                    )}>
                                Send
                                <SendIcon/>
                            </Button>
                        </div>
                    </form>
                )}
                <MessageDialog
                    open={showResetMessage}
                    onClose={props.goToLogin}
                    title='Passord endret'
                    content='Ditt passord blitt forandret, sjekk mail for ditt nye passord.'
                />
            </Paper>
    )
};

export default Recover;
