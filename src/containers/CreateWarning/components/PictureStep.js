import React from 'react';
import { makeStyles } from '@material-ui/styles';

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
            margin: 'auto',
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
            <div className={classes.inputSection}>
                <label htmlFor="upload-button">
                    <IconButton color="primary" aria-label="Add" component="span" className={classes.button}>
                        <AddPhotoAlternate fontSize={'large'} className={classes.bookmark} color='action'/>
                    </IconButton>
                </label>
            </div>
            {props.images.map((img, index) => (
                <div className={classes.imageDiv} key={index}>
                    <img className={classes.image} id="target" src={img} alt='warningvisual'/>
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