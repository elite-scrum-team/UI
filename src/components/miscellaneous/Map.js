import React, { useState, useCallback, useEffect, PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapStyles from '../../assets/mapStyles.json';

// Icons
import WarningMarkerIcon from '../../assets/img/warningMarker.png';
import WarningMarkerCircleIcon from '../../assets/img/warningMarker02.png';

// External libraries
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps'

const CIRCLE_RADIUS = 2000;

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
)(React.memo((props) => {

  // State
  const [selectedLocation, setSelectedLocation] = useState(props.defaultSelectedLocation || {lat: 0, lng: 0});
  const [defaultLocation, setDefaultLocation] = useState(props.defaultCenter);

  useEffect(() => {
      setSelectedLocation(props.defaultSelectedLocation || {lat: 0, lng: 0});
  }, [props.defaultSelectedLocation]);

    useEffect(() => {
        setDefaultLocation(props.defaultCenter || {lat: 0, lng: 0});
        console.log(props.defaultCenter);
    }, [props.defaultCenter]);


  return (
    <GoogleMap
      {...props}
      defaultZoom={props.zoom}
      center={ defaultLocation }
      defaultOptions = {{
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false,
          styles: mapStyles,
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
          icon={WarningMarkerCircleIcon}
         />
        )
        })}

      {props.clickable && <Marker position={selectedLocation} icon={WarningMarkerIcon} clickable={false}/>}

      {props.circlePosition && <Circle center={props.circlePosition} radius={CIRCLE_RADIUS} options={{fillOpacity: 0, strokeOpacity: 0.1}}/>}
    </GoogleMap>
  )
}));


class MapWrapper extends PureComponent {

  state = {
    locations: [],
  }

  componentDidUpdate(prevProps) {
    if(prevProps.locations !== this.props.locations) {
      this.setState({locations: this.props.locations});
    }
  }

  onMapMounted = (map) => {
    if(this.props.map && map) {
      this.props.map(map);
    }
  }

  render() {
    return (
      <Map
        onMapMounted={this.onMapMounted}
        defaultCenter={this.props.defaultCenter || {}}
        showMarkers={this.props.showMarkers}
        locations={this.state.locations}
        zoom={this.props.zoom}
        clickable={this.props.clickable}
        circlePosition={this.props.circlePosition}
        //defaultSelectedLocation={props.defaultSelectedLocation}
      />

  )
  }
}

MapWrapper.propTypes = {
  locations: PropTypes.array,
  defaultCenter: PropTypes.object, // Object with lat and lng
  showMarkers: PropTypes.bool,
  zoom: PropTypes.number,
  clickable: PropTypes.func, // Makes it possible to click on the map, moving a marker, and adding a callback
  circlePosition: PropTypes.object,
    defaultSelectedLocation: PropTypes.object,
};

MapWrapper.defaultProps = {
  locations: [],
  defaultCenter: {lat: 63.429748, lng: 10.393916},
  showMarkers: true,
  zoom: 8,
};

export default (MapWrapper);
