import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import Fab from "@material-ui/core/Fab";

// Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternate from "../../../../node_modules/@material-ui/icons/AddPhotoAlternate";
import IconButton from "@material-ui/core/IconButton";

// Project components

// Styling
const styles = makeStyles({
    imageDiv: {
        maxWidth: '450px',
        maxHeight: '350px',
        position: 'relative',
        marginTop: '30px',
        marginRight: '30px',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: '300px',
    },
    deleteImg: {
        right: '-20px',
        top: '-20px',
        position: 'absolute',
    }
});

const PictureStep = (props) => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                style={{display: 'none'}}
                id="upload-button"
                multiple
                type="file"
                onChange={props.onImageChangeCallback}
            />
            <div>
                <label htmlFor="upload-button">
                    <IconButton color="primary" aria-label="Add" component="span" className={classes.button}>
                        <AddPhotoAlternate fontSize={'large'} className={classes.bookmark} color='action'/>
                    </IconButton>
                </label>
            </div>
            {props.images.map((img, index) => (
                <div className={classes.imageDiv} key={index}>
                    <img className={classes.image} id="target" src={img}/>
                    <Fab className={classes.deleteImg} value={index}
                         onClick={() => props.handleClickDeleteCallback(index)} color="secondary" size='small'
                         aria-label="Add" component="span">
                        <DeleteIcon/>
                    </Fab>
                </div>
            ))}
        </div>
    )
}

export default (PictureStep);