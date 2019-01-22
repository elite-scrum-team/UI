import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';

// Services
import AuthService from '../../api/services/AuthService';
import GeoService from '../../api/services/GeoService';
import LocationService from '../../api/services/LocationService';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons
import Logo from '../../assets/img/HverdagsHeltLogo.png';

// Project components
import Navigation from '../../components/navigation/Navigation';
import Functions from './components/Functions';
import Tutorial from './components/Tutorial';
import Quote from './components/Quote';
import Starter from './components/Starter';
import MessageDialog from '../../components/miscellaneous/MessageDialog';
import Button from "../../../node_modules/@material-ui/core/Button/Button";

const styles = {
    root: {
        height: '100vh',

        display: 'flex',
        flexDirection: 'column',
    },
    imageWrapper: {
        display: 'block',
        margin: 'auto',
        '@media only screen and (max-width: 600px)': {
            maxWidth: 275,
        }
    },
    top: {
        position: 'relative',
        backgroundColor: '#009688',
        width: '100vw',
        minHeight: 200,
        zIndex: 99,

        paddingTop: 80,
        paddingBottom: 180,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '@media only screen and (max-width: 600px)': {
            paddingTop: 42,
            paddingBottom: 82,
            minHeight: 125,
        }
    },
    contentWrapper: {
        zIndex: 100,
        flexGrow: 1,
        boxShadow: '0px -3px 2px 0px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
    },
    textWrapper: {
        color: 'white',
        maxWidth: 700,
        marginBottom: 30,
    },
    text: {
        '@media only screen and (max-width: 800px)': {
            fontSize: '22px',
        }
    },
    logo: {
        width: '100%',
        maxWidth: 450,
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
        margin: 'auto',
    },
    nav: {
        position: 'absolute',
        top: 0,
        width: '90vw',
        maxWidth: 800,
        display: 'flex',
        justifyContent: 'space-between',
        height: 48,
        color: 'white',
    },
    SVGLogo: {
        fill: '#fff',
        height: '100%',
        width: '100%',
    },
    logoWrapper: {
        minWidth: 50,
        minHeight: 50,
        width: 50,
        height: 50,
    },
    warning: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        margin: '0 auto',
    },
    warningWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
}

class Landing extends Component {

    state = {
        isGeoCodingError: false, // Can not get location
        municipalities: [],
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getAllMunicipalities();
    }

    getAllMunicipalities() {
        LocationService.getMunicipalities((isError, data) => {
            if(isError === false) {
                this.setState({municipalities: data.map(m => ({value: m.id, label: m.name}))});
            }
        });
    }

    searchByLocation = () => {
        GeoService.getGeoLocation((position) => {
            this.props.history.push(URLS.discover);
        },
        (error) => {
            this.setState({isGeoCodingError: true});
        });
    }

    onMunicipalitySelected = (event) => {

        this.props.history.push(URLS.discover.concat('?municipality=', event.value));
    }

    goTo = (page) => {
        this.props.history.push(page);
    }

    logOut = () => {
        AuthService.logOut();
        this.setState({}); // For rerender
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation noShadow>
                <div className={classes.root}>
                    <div className={classes.top}>
                        <div className='pl-10 pr-10'>
                            <div className={classes.imageWrapper}>
                                <img className={classes.logo} src={Logo} alt='HverdagsHeltLogo' />
                            </div>
                            <div className={classes.textWrapper}>
                                <Typography className={classes.text} variant='h4' color='inherit' align='center'>
                                Varsle din kommune om dine kommunale problemer
                                </Typography>
                            </div>
                            <div className={classes.warningWrapper}>
                                <Button onClick={() => this.goTo(URLS.createwarning)} className={classes.warning} variant='outlined' color='inherit' size='large'>Send varsel</Button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.contentWrapper}>
                        <Functions
                            municipalities={this.state.municipalities}
                            onMunicipalitySelected={this.onMunicipalitySelected}
                            goTo={this.goTo}
                            searchByLocation={this.searchByLocation}
                            />
                        <Tutorial />
                        <Quote />
                        <Starter goTo={this.goTo} />
                    </div>
                    <MessageDialog
                        open={this.state.isGeoCodingError}
                        onClose={() => this.setState({isGeoCodingError: false})}
                        title='Kunne ikke hente din lokasjon'
                        content='Vi kunne dessverre ikke hente lokasjonen din. Aksepter forespørselen om å dele lokasjon eller sjekk instillingene dine.'
                        error={true}
                    />
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Landing);
