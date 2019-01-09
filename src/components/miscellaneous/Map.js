import React from 'react';
import PropTypes from 'prop-types';

// External libraries
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "100%", width: "100%" }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={{ lat: props.defaultCenter.lat, lng: props.defaultCenter.lng }}
    defaultOptions = {{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
    }}
  >
    {/* Render markes */}
    {props.showMarkers && props.locations.map((location, i) => (
      <Marker key={i.toString().concat(location.lat)} position={{ lat: location.lat, lng: location.lng }} onClick={() => location.onClick ? location.onClick(location) : null}/>
    ))}
  </GoogleMap>
);

const MapWrapper = (props) => {

    return (
      <Map
        defaultCenter={props.defaultCenter || {}}
        showMarkers={props.showMarkers}
        locations={props.locations || []}
        zoom={props.zoom}/>
    )
}

MapWrapper.propTypes = {
  locations: PropTypes.array,
  defaultCenter: PropTypes.object, // Object with lat and lng
  showMarkers: PropTypes.bool,
  zoom: PropTypes.number,
}

MapWrapper.defaultProps = {
  locations: [],
  defaultCenter: {lat: 63.429748, lng: 10.393916},
  showMarkers: true,
  zoom: 8,
}

export default (MapWrapper);
