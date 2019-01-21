import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'
// Icons

// Project components

const styles = makeStyles({
    root: {
        backgroundColor: 'white',
        height: 300,
        maxHeight: 300,
        paddingBottom: 20,
        width: '90%'
    },
    container:{
        height: 300,
    },
    image: {

    }
});

const Image = (props) => {
    // Styling
    const classes = styles();

    return (
        <div className={classNames(classes.root, props.className)}>
           <GridList className={classes.container}>
               {props.image.map((e,index) =>(
                   <GridListTile key={e.id} cols={(index%3 === 0) ? 2 : 1} rows={(index%3 === 0) ? 2 : 1}>
                   <img src={e.fileURL} />
                   </GridListTile>
               ))
               }

           </GridList>
        </div>
    )
};

Image.propTypes = {

};

export default (Image);
