import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components
import Map from '../miscellaneous/Map';

const styles = makeStyles({
    root: {

    },
    mapContainer: {
        width: 450,
        height: 350,
        maxWidth: '450px',
        maxHeight: '350px',

        '@media only screen and (max-width: 600px)': {
            maxWidth: '100vw',
            overflow: 'hidden',
        }
    },
    detailContainer: {
        marginTop: 12,
        '@media only screen and (max-width: 600px)': {
            marginLeft: 24,
        }
    }
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
    };


    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <div className={classes.mapContainer}>
                    <Map
                        clickable={onMapClick}
                        defaultCenter={props.location}
                        zoom={14}
                    />
                </div>

                <div className={classes.detailContainer}>
                    <Typography variant='caption'>Latitude: {selectedLocation.lat}</Typography>
                    <Typography variant='caption' >Longitude: {selectedLocation.lng}</Typography>
                </div>
            </div>
        </div>
    )
};

MapStep.propTypes = {
    mapMarkerCallback: PropTypes.func,
};

export default (MapStep);