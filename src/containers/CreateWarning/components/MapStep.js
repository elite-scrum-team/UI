import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components

// Icons

// Project components
import Map from '../../../components/miscellaneous/Map';
import Step from "./Step";
import CardContent from "@material-ui/core/CardContent";


const styles = makeStyles({
    root: {

    },
    mapContainer: {
        width: 450,
        height: 350,
        maxWidth: '450px',
        maxHeight: '350px',
    },
});

const MapStep = (props) => {
    // State
    const [selectedLocation, setSelectedLocation] = useState({lat: null, lng: null});

    // Styling
    const classes = styles();

    const onMapClick = (event) => {
        console.log(event);
        const locationObject = event.latLng;
        console.log(locationObject.lat());
        setSelectedLocation({lat: locationObject.lat(), lng: locationObject.lng()});
        const data = {lat: locationObject.lat(), lng: locationObject.lng() };
        props.mapMarkerCallback(data);

    }


    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <div className={classes.mapContainer}>
                    <Map clickable={onMapClick}/>
                </div>

                <div><small><i>Latitude: {selectedLocation.lat}</i></small></div>
                <div><small><i>Longitude: {selectedLocation.lng}</i></small></div>

            </div>
        </div>
    )
}

MapStep.propTypes = {
    mapMarkerCallback: PropTypes.func,
}

export default (MapStep);