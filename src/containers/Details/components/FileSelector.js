import React from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton'


// Material UI components
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'

// Icons

// Project components

const styles = makeStyles({
    root: {

    },

});

const FileSelector = (props) => {
    // State


    // Styling
    const classes = styles();

    let onImageChange = (event) => {
        // Check if image is uploaded
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        const file = event.target.files[0];

        // Function for reading and adding an image
        let reader = new FileReader();
        reader.onload = (e) => {

            !props.onChange || props.onChange(e.target.result, file);
        };

        reader.readAsDataURL(file);

    };

    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <input
                    accept="image/*"
                    className={classes.input}
                    style={{display: 'none'}}
                    id="upload-button"
                    multiple
                    type="file"
                    onChange={onImageChange}
                />
                <label htmlFor="upload-button">
                    <IconButton color="primary" aria-label="Add" component="span" className={classes.button}>
                        <AddPhotoAlternate className={classes.bookmark} color='action'/>
                    </IconButton>
                </label>
            </div>
        </div>
    )
};

export default (FileSelector);