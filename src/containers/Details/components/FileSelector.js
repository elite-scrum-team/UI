import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton'


// Material UI components
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'

// Icons

// Project components

const styles = makeStyles({
    root: {

    }
});

const FileSelector = (props) => {
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
                const images = Object.assign([], data.images);
                images.push(e.target.result);

                data.images = images;
                console.log(data.images);
            };

            reader.readAsDataURL(file);
        };

        // Read images
        if (event.target.files && event.target.files[0]) {
            [].forEach.call(event.target.files, readImage)

        }
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
                <div>

                </div>
            </div>
        </div>
    )
};

export default (FileSelector);