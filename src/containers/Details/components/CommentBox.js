import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';



// Material UI components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// Icons

// Project components
import FileSelector from "./FileSelector";

const styles = makeStyles({
    root: {
        padding: '22px',
        backgroundColor: 'red',
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
        padding: 10,
    }
});

const CommentBox = (props) => {
    // State
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    // Styling
    const classes = styles();

    return (
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
            {image && <img src={image} alt={'commentImage'} />}
            <div className={classes.clickables}>
                <Button variant="contained" color="primary" className={classes.button}>
                    Kommenter
                </Button>
                <FileSelector onChange={(image, file) => {
                    setImage(image);
                    setFile(file);
                }}/>
            </div>
        </Paper>
    )
}

export default (CommentBox);