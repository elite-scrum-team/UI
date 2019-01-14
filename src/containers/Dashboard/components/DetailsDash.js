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
import WarningDetails from "../../Details/components/WarningDetails";
import ActionModule from "../../Details/components/ActionModule";
import FeedModule from "../../Details/components/FeedModule";
import ImageGrid from "../../Details/components/ImageGrid";
import LogoImage from "../../../assets/img/logo.png";


const styles = makeStyles({
    root: {
        marginLeft: 340,
        marginRight: 15,
        paddingTop: 50,
        paddingBottom: 100,
    },
    center: {
        margin: 'auto',
        display: 'block',
        maxWidth: 850,

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

});

const DetailsDash = (props) => {
    // State

    // const [id, setID] = useState({
    //
    //     id: null,
    //     title: null,
    //     warnDate: null,
    //     status: 1,
    //     province: null,
    //     statusMessage: null,
    //     description: null,
    //     location: {
    //         lat: 0,
    //         lng: 0,
    //     },
    //     images: null,
    // });

    // Styling
    const classes = styles();

    const loadWarning = (event) => {

    }

    if (props.state.id == null) {
        return (
            <div className={classes.root}>
                <img className={classes.img}
                     src={LogoImage}
                     title={'Hverdagshelt logo'}/>
            </div>
        )
    }
    ;

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.center}>
                <WarningDetails
                    title={props.state.title}
                    date={props.state.warnDate}
                    status={props.state.status}
                    province={props.state.province}
                    statusMessage={props.state.statusMessage}
                    description={props.state.description}
                    location={props.state.location}
                />
                <ImageGrid
                    images={props.state.images}
                />
            </Paper>
            <div className={classes.center}>
                <div className={classes.content}>
                    <div>
                        <Paper elevation={1} className='p-30'>
                            <ActionModule className={classes.actionMod}/>
                        </Paper>
                    </div>
                    <div>
                        <FeedModule
                            id={props.state.id}
                            items={props.state.items}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (DetailsDash);