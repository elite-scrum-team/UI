import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// Icons

// Project components

const styles = makeStyles({
    root: {
        backgroundColor: 'white',
        height: 300,
        maxHeight: 300,
        margin: '20px 0 20px 0',
        width: '90%'
    },
    container:{
        height: 300,
    },
    image: {
        width: '100%'
    }
});

const Image = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.root, props.className)}>
            <img src={props.image[0]} alt={props.image[0]} className={classes.image}/>
        </div>
    )
};

Image.propTypes = {

};

export default (Image);
