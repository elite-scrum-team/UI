import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Search from '@material-ui/icons/Search';
import Filter from '@material-ui/icons/FilterList';

// Project components

const styles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 12,
        height: 'auto',
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.3)',
        height: 48,
    }
});

const SearchBar = (props) => {

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Search className='mr-10'/>
            <InputBase
                fullWidth
                placeholder='Søk etter sted'
                value={props.value}
                onChange={props.onChange}/>
            <Divider className={classes.divider} />
            <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                <Filter />
            </IconButton>
        </div>
    )
}

export default (SearchBar);