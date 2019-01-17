import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Icons
import WarningMarkerIcon from '../../assets/img/warningMarker.png';
import WarningMarkerCircleIcon from '../../assets/img/warningMarker02.png';

// External libraries
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

// React-Google-Maps component
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => {

  // State
  const [selectedLocation, setSelectedLocation] = useState({lat: 0, lng: 0});

  return (
    <GoogleMap
      {...props}
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
      ref={props.onMapMounted}
      
      
      onClick={
        props.clickable ? (e) => {

          // Move marker
          setSelectedLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });

          // Calling callback
          props.clickable(e);
        }
        :
        () => {}
      }
    >
      {/* Render markes */}
      {props.showMarkers && props.locations.map((location, i) => {
        
        location.location = location.location || {};

        return (<Marker
          key={i.toString().concat(location.lat)}
          position={location.location}
          clickable={location.onClick !== undefined}
          onClick={location.onClick ? () => location.onClick(location) : null}
          icon={WarningMarkerCircleIcon}/>
        )
        })}

      {props.clickable && <Marker position={selectedLocation} icon={WarningMarkerIcon} clickable={false}/>}

    </GoogleMap>
  )
});

const MapWrapper = (props) => {

    // const [center, setCenter] = useState({lat: 0, lng: 0});

    const onMapMounted = (map) => {
      if(props.map && map) {
        props.map(map);
      }
    }

    return (
      <Map
        {...props}
        onMapMounted={onMapMounted}
        defaultCenter={props.defaultCenter || {}}
        showMarkers={props.showMarkers}
        locations={props.locations || []}
        zoom={props.zoom}
        clickable={props.clickable}/>
    )
}

MapWrapper.propTypes = {
  locations: PropTypes.array,
  defaultCenter: PropTypes.object, // Object with lat and lng
  showMarkers: PropTypes.bool,
  zoom: PropTypes.number,
  clickable: PropTypes.func, // Makes it possible to click on the map, moving a marker, and adding a callback
}

MapWrapper.defaultProps = {
  locations: [],
  defaultCenter: {lat: 63.429748, lng: 10.393916},
  showMarkers: true,
  zoom: 8,
}

export default (MapWrapper);
