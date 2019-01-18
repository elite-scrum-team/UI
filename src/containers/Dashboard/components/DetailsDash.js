import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

// Material UI components

// Icons
import Accessible from '@material-ui/icons/Accessible';
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";

// Project components
import WarningDetails from "../../../components/layout/WarningDetails";
import ActionModule from "../../../components/layout/ActionModule";
import FeedModule from "../../../components/layout/FeedModule";
import ImageGrid from "../../../components/layout/ImageGrid";
import LogoImage from "../../../assets/img/logo.png";
import Hidden from '@material-ui/core/Hidden';
import Button from "@material-ui/core/Button/Button";
import WarningList from "./WarningList";
import URLS from "../../../URLS";


const styles = makeStyles({
    root: {
        '@media only screen and (min-width: 601px)': {
            marginLeft: 340,
        },
        '@media only screen and (max-width: 600px)': {
            marginLeft: 15,
        },
        marginRight: 15,
        paddingTop: 50,
        paddingBottom: 100,
    },
    center: {
        margin: 'auto',
        display: 'block',
        maxWidth: 1000,

    },
    img: {
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
        margin: 'auto',
        marginTop: '100px',
        display: 'block',
    },

    content: {
        display: 'grid',

        gridTemplateColumns: '1fr 3fr',
        gridGap: '14px',

        marginTop: 14,

        '@media only screen and (max-width: 1000px)': {
            padding: '0 4px',
        },
        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
        }
    },
    style: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },

});

const DetailsDash = (props) => {

    // Styling
    const classes = styles();

    if (props.showWarning == null) {
        return (
            <div className={classes.root}>
                <img className={classes.img}
                    src={LogoImage}
                    title={'Hverdagshelt logo'}/>
            </div>
        )
    };

    const goTo = page => {
        console.log(props);
        //props.history.push(page);
        props.mountWarningCallback(null);
    };

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.center}>
                <WarningDetails
                    title={props.state.title}
                    date={props.state.posted}
                    status={props.state.status}
                    statusMessage={props.state.statusMessage}
                    description={props.state.description}
                    location={props.state.location}
                    municipality={props.state.municipality}
                />
                <ImageGrid
                    images={props.state.images}
                />
            </Paper>
            <div className={classes.center}>
                <div className={classes.content}>
                    <div>
                        <Paper elevation={1} className='p-30'>
                            <ActionModule
                                className={classes.actionMod}
                                updateStatus={props.changeStatus}
                                updateContract={props.changeContract}/>
                        </Paper>
                    </div>
                    <div>
                        <FeedModule
                            id={props.state.id}
                            items={props.state.warningItems}
                        />
                    </div>
                </div>
            </div>
            <Hidden implementation='js' smUp>
                <div>
                    <Button onClick={() => goTo(URLS.dashboard)} variant="contained" size={'large'} color="primary" className={classes.style}>
                        Varselliste
                    </Button>
                </div>
            </Hidden>
        </div>
    )
};

DetailsDash.propTypes = {
    goTo: PropTypes.func
};

DetailsDash.defaultProps = {
    goTo: () => {}
};

export default (DetailsDash);