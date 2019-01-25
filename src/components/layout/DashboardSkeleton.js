import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';
import classNames from "classnames";

// Material UI components

// Icons

// Project components

const styles = makeStyles({

    skeletonRoot: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridGap: '20px',
        maxWidth: 1000,
        margin: 'auto',
    },
    skeletonRootNext: {
        marginLeft: 445,
        padding: 40,
        //display: 'block',
    },
    skeleton: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 200,
    },
    span: {
        gridColumn: 'span 2',
        height: 328,
    },
    height: {
        height: 200,
    },
});

const DashboardSkeleton = (props) => {
    // State


    // Styling
    const classes = styles();

    return (
        <div className={classes.skeletonRootNext}>
        <div className={classes.skeletonRoot}>
                <div className={classNames(classes.skeleton, classes.span)}/>
                <div className={classes.skeleton}/>
                <div>
                    <div className={classNames(classes.skeleton, classes.height)}>

                    </div>
                </div>
        </div>
            </div>
    )
}

export default (DashboardSkeleton);