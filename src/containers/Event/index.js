import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Services


// Material UI components


// Icons


// Project components
import Navigation from '../../components/navigation/Navigation';


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
            items: [], // events

            municipalities: [], // Municipalities in search bar
            municipalityId: null,
        };

        this.map = null;
    }

    componentDidMount(){

    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation sidebar isLoading={this.isLoading}>

            </Navigation>
        );
    }
}
export default withStyles(styles)(Discover);
