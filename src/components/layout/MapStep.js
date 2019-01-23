import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';

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
    const [selectedLocation, setSelectedLocation] = useState(!props.selectedLocation ? {lat: 0, lng: 0} : {lat: props.selectedLocation.lat, lng: props.selectedLocation.lng});

    // Styling
    const classes = styles();

    useEffect(() => {
        setSelectedLocation(props.selectedLocation || {lat: 0, lng: 0});
     }, [props.selectedLocation]);

    const onMapClick = (event) => {
        console.log(event);
        const locationObject = event.latLng;
        console.log(locationObject);
        setSelectedLocation({lat: locationObject.lat(), lng: locationObject.lng()});
        const data = {lat: locationObject.lat(), lng: locationObject.lng() };
        props.mapMarkerCallback(data);
    };

    const markMap = (location) => {
        setSelectedLocation({lat: location.lat(), lng: location.lng()});
    };

    return (
        <div className={classes.root}>
            <div className={classes.right}>
                <div className={classes.mapContainer}>
                    <Map
                        clickable={onMapClick}
                        defaultCenter={props.selectedLocation ? props.selectedLocation : props.defaultLocation}
                        defaultSelectedLocation={props.selectedLocation}
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
