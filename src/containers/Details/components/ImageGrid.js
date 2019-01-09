import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI Components

// Icons

// Project Components
import ClickableImage from '../../../components/miscellaneous/ClickableImage';

const styles = makeStyles({
    root: {
        padding: 12,
        display: 'grid',
        
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: 12,
    
        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr 1fr',
        },

        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '1fr',
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        
        maxHeight: 200,

        '@media only screen and (max-width: 800px)': {
            maxWidth: 'none',
        }

    }
});

const DescriptionDetails = (props) => {

    // Styling
    const classes = styles();
    const images = props.images || [];

    return (
        <div className={classes.root}>
            {images.map((image, index) => (
                <ClickableImage key={image.concat(' - ', index)} className={classes.image} image={image} alt='warning image'/>
            ))}
        </div>
    )
}

DescriptionDetails.propTypes = {
    images: PropTypes.array,
}

export default (DescriptionDetails);