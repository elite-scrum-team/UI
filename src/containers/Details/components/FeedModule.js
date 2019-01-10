import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/es/Paper/Paper";

// Icons

// Project components
import FileSelector from './FileSelector'


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
        padding: 10,
    }
});

const FeedModule = (props) => {
    // State
    const [data, setData] = useState({});

    // Styling
    const classes = styles();

    let onImageChange = (event) => {
        console.log(event.target.files);

        // Function for reading and adding an image
        const readImage = (file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                const images = Object.assign([], this.state.images);
                images.push(e.target.result);

                this.setState({images: images});
                console.log(this.state.images);
            };

            reader.readAsDataURL(file);
        };

        // Read images
        if (event.target.files && event.target.files[0]) {


            [].forEach.call(event.target.files, readImage)
            // for(let i = 0; i < event.target.files.length; i++) {
            //     reader.readAsDataURL(event.target.files[i]);
            // }
            //event.target.files.forEach((image) => );

        }
    }
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
                    <FileSelector/>
                </div>
            </Paper>
        </div>
    )
}

FeedModule.propTypes = {
    
}

export default (FeedModule);