import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Services
import AuthService from '../../api/services/AuthService';
import WarningService from '../../api/services/WarningService';
import GeoService from '../../api/services/GeoService';
import LocationService from '../../api/services/LocationService';

// Material UI components
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';

// Icons
import MapIcon from '@material-ui/icons/Map';
import CloseIcon from '@material-ui/icons/Close';

// Project components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';
import Sidebar from './components/Sidebar';
import SearchContent from './components/SearchContent';
import SmallDetail from './components/SmallDetail'

// External imports
import queryString from 'query-string'

const styles = theme => ({
  root: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: '100vh',
    marginTop: '-48px',
    position: 'relative',

    marginLeft: 400,

    '@media only screen and (max-width: 800px)': {
      marginLeft: 0,
    }
  },
  drawerPaper: {
    width: 320,
  },
  infoModule: {
    position: 'absolute',
    top: 70, right: 20,
    width: 400,

    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
      maxWidth: '98vw',
      margin: 'auto',
    },
  },
  content: {
    marginTop: 10,
  },
  fabBtn: {
    position: 'fixed',
    bottom: 10,
    right: 10,
  }
});

const SEARCH_SECTION = 0;
const USER_SECTION = 1;

class Discover extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        showMap: false,
        currentLocation: { // Start location on map
            lat: 63.428322,
            lng: 10.392774,
        },
        search: null,
        items: [],
        detail: false, // Should show warning details
        item: {}, // The warning detail item

        zoom: 15, // Default zoom on map
        municipalities: [], // Municipalities in search bar
        municipalityId: null,
      };

      this.map = null;
    }

    componentDidMount() {
      this.init();
    }

    init = async () => {
      this.setState({isLoading: true});

      // Parse url string
      const queryParams = queryString.parse(this.props.location.search);
      if(queryParams.municipality) {
        await this.setState({municipalityId: queryParams.municipality});
      }

      LocationService.getMunicipalities((isError, data) => {
        this.setState({municipalities: isError ? [] : data.map(m => ({value: m.id, label: m.name}))});

        if(this.state.municipalityId) {
          this.getWarningsWithMunicipality({excludeStatus: [0, 4, 5]});
        } else {
          this.getWarningsWithLocation();
        }
      });
    }

    setMapRef = (map) => {
      if(this.map === null){
        this.map = map;
      } else {
        return;
      }
    }

    mapGoTo = (location) => {
      if(this.map) {
        this.map.panTo(location);
      }
    }

    getWarningsWithMunicipality = (filter) => {
      this.setState({isLoading: true});
      let filters = {};
      if(this.state.municipalityId) {
        filters = {
          ...filters,
          municipality: this.state.municipalityId,
        }
      }

      this.getWarnings(filters);
    }

    getWarningsWithLocation = (filter) => {
      GeoService.getGeoLocation((position) => {
        // Got position
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        } 
        this.setState({});
        this.mapGoTo(location);
        
        this.setState({isLoading: true, currentLocation: location, search: {}, zoom: 15});
        const filters = {
          ...filter,
          lat: location.lat,
          lng: location.lng,
          excludeStatus: [0, 4, 5]
        };
        this.getWarnings(filters, false)
      });
    }

    getWarnings = (filters, willGoTo=true) => {
      WarningService.getWarnings({createdAt: true}, filters, (isError, data) => {
        if(isError === false) {
          this.setState({items: data.map(e => ({...e, onClick: () => this.detail(e)}))});
          if(data && data.length > 0 && data[0].location) {
            willGoTo && this.mapGoTo(data[0].location);
            this.setState({currentLocation: data[0].location});
          }
        }
        this.setState({isLoading: false});
      });
    };

    onSectionChange = (value) => {
      this.setState({isLoading: true});

      const filters = {};
      
      if(value === SEARCH_SECTION) {
        filters.excludeStatus = [0, 1, 4, 5];
        this.getWarningsWithMunicipality(filters);
      } else if(value === USER_SECTION && AuthService.isAuthenticated()) {
        filters.useUserId = true;
        this.getWarnings(filters);
      }
    };

    toggleChange = (name) => (event) => {
      this.setState({[name]: !this.state[name]});
    };

    handleChange = (name, useValue = false) => (event) => {
      this.setState({[name]: useValue ? event : event.target.value});
    };

    goTo = (page) => {
      this.props.history.push(page);
    };

    onSearch = async (event) => {
      if(!event) return;
      await this.setState({search: event, municipalityId: event.value});
      this.getWarningsWithMunicipality({excludeStatus: [0, 4, 5]});
    };

    detail = async (item) => {
        console.log(item);
        this.setState({
            detail: true,
            item: item,
            zoom: 18,
        });
        this.mapGoTo(item.location);
    };

    render() {
      const {classes} = this.props;
      return (
        <Navigation sidebar isLoading={this.isLoading}>
          <Hidden implementation='js' smDown>

              {!this.state.detail
                  ?
                  <Sidebar
                    searchValue={this.state.search}
                    items={this.state.items}
                    onSubmit={this.onSearch}
                    onSectionChange={this.onSectionChange}
                    isLoading={this.state.isLoading}
                    detail={this.detail}
                    municipalities={this.state.municipalities}
                    onLocation={this.getWarningsWithLocation}
            />
                  :
                  <SmallDetail nextdetail={() =>{ this.setState({detail: false, loadingDetail:true})}} item={this.state.item} goTo={this.goTo}/>
              }

          </Hidden>

          <Hidden implementation='js' smDown={!this.state.showMap}>
            <div className={classes.root}>
              <Map
                  onZoomChanged={this.handleChange('zoom', true)}
                  zoom={this.state.zoom}
                  map={this.setMapRef}
                  locations={this.state.items}
                  defaultCenter={this.state.currentLocation}
              />
            </div>
          </Hidden>

          {!this.state.showMap &&
            <Hidden implementation='js' mdUp>
              <div className={classes.content}>
              {!this.state.detail
                  ?
                  <SearchContent
                    searchValue={this.state.search}
                    items={this.state.items}
                    onSubmit={this.onSearch}
                    onSectionChange={this.onSectionChange}
                    isLoading={this.state.isLoading}
                    detail={this.detail}
                    municipalities={this.state.municipalities}
                    onLocation={this.getWarningsWithLocation}
                  />
                  :
                  <SmallDetail nextdetail={() =>{ this.setState({detail: false, loadingDetail:true})}} item={this.state.item} goTo={this.goTo}/>
              }
              </div>
            </Hidden>
          }
          <Hidden implementation='js' mdUp>
            <Fab className={classes.fabBtn} color='primary' onClick={this.toggleChange('showMap')}>
              {this.state.showMap ? <CloseIcon /> : <MapIcon />}
            </Fab>
          </Hidden>
        </Navigation>
      );
    }
}
export default withStyles(styles)(Discover);
