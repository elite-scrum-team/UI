import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';

// External Components
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const styles =  makeStyles({
    root: {
        cursor: 'pointer',
    },
});

const ClickableImage = (props) => {
    const [open, setOpen] = useState(false);
    const classes = styles();
    const {className, image, alt, ...rest} = props;

    if (!image) {
        return null;
    }

    return (
        <Fragment>
            <img
                onClick={() => setOpen(!open)}
                className={classNames(classes.root,className)}
                src={image}
                alt={alt}
                {...rest} />
            {open && (
                <Lightbox
                    mainSrc={image}
                    onCloseRequest={() => setOpen(false)}/>
            )}
        </Fragment>
    );
}

ClickableImage.propTypes = {
    image: PropTypes.any,
    className: PropTypes.string,
    alt: PropTypes.string,
};

export default (ClickableImage);