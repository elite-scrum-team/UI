import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'
import Paper from "@material-ui/core/es/Paper/Paper";

// Icons

// Project components

const styles = makeStyles({
    root: {
        
    },
    clickables:{
        alignItems: 'center',
        display: 'flex',
        gridTemplateAreas: 'commentButton bookmark',
    },
    button:{
        gridArea: 'commentButton',
    },
    bookmark:{
        justifySelf: 'center',
        gridArea:'bookmark',
        paddingLeft: 5,
    }
});

const FeedModule = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Paper className='p-30' square>
                <TextField
                    id="filled-multiline-static"
                    label="Skriv en kommentar..."
                    multiline
                    fullWidth
                    rows="2"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                />
                <div className={classes.clickables}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Kommenter
                    </Button>
                    <AddPhotoAlternate className={classes.bookmark} color='action'/>
                </div>
            </Paper>
        </div>
    )
}

FeedModule.propTypes = {
    
}

export default (FeedModule);