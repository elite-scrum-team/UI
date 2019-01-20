import React from 'react';
import {makeStyles} from '@material-ui/styles';

// Material UI components
import Fab from "@material-ui/core/Fab";

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import IconButton from "@material-ui/core/IconButton";

// Project components

// Styling
const styles = makeStyles({
    imageDiv: {
        marginTop: 10,
        maxWidth: 275,
        maxHeight: '350px',
        position: 'relative',

        '@media only screen and (max-width: 600px)': {
            maxWidth: '90vw',
            display: 'block',
            marginRight: 50,
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        maxHeight: '300px',
        maxWidth: '90vw',
        display: 'block',
        margin: 'auto',
        '@media only screen and (max-width: 600px)': {
            marginRight: 30,
        },
    },
    deleteImg: {
        right: '-20px',
        top: '-20px',
        position: 'absolute',
    },
    inputSection: {
        '@media only screen and (max-width: 600px)': {
            marginLeft: 50,
        }
    }
});

const SinglePictureStep = (props) => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                style={{display: 'none'}}
                id="upload-button"
                type="file"
                onChange={props.onImageChangeCallback}
            />
            <div className={classes.inputSection}>
                <label htmlFor="upload-button">
                    <IconButton color="primary" aria-label="Add" component="span" className={classes.button}>
                        <AddPhotoAlternate fontSize={'large'} className={classes.bookmark} color='action'/>
                    </IconButton>
                </label>
            </div>
            {props.image &&
            <div className={classes.imageDiv}>
                <img className={classes.image} id="target" src={props.image} alt='warningvisual'/>
                <Fab className={classes.deleteImg}
                     onClick={() => props.handleClickDeleteCallback()} color="secondary" size='small'
                     aria-label="Add" component="span">
                    <DeleteIcon/>
                </Fab>
            </div>
            }
        </div>
    )
}

export default (SinglePictureStep);