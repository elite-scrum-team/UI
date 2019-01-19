import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';


// Services
import GeoService from '../../api/services/GeoService';
import LocationService from '../../api/services/LocationService';

// Material UI components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Logo from '../../assets/img/HverdagsHeltLogo.png';
import LogoIcon from '../../components/miscellaneous/Logo';

// Project components
import Functions from './components/Functions';
import Tutorial from './components/Tutorial';
import Quote from './components/Quote';
import Starter from './components/Starter';

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
        width: '100%',
        minHeight: 200,
        zIndex: 99,
        paddingBottom: 40,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '@media only screen and (max-width: 600px)': {
            paddingTop: 42,
            paddingBottom: 22,
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
    }
}

class Landing extends Component {

    state = {
        municipalities: [],
    }

    componentDidMount() {
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
        });
    }

    onMunicipalitySelected = (event) => {

        this.props.history.push(URLS.discover.concat('?municipality=', event.value));
    }

    goTo = (page) => {
        this.props.history.push(page);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                
                <div className={classes.top}>
                    <div className={classes.nav}>
                        <div className={classes.logoWrapper}><IconButton><LogoIcon className={classes.SVGLogo}/></IconButton></div>
                        <Button variant='text' size='small' color='inherit' onClick={() => this.goTo(URLS.login)}>Logg inn</Button>
                    </div>
                    <div className='pl-10 pr-10'>
                        <div className={classes.imageWrapper}>
                            <img className={classes.logo} src={Logo} alt='HverdagsHeltLogo' />
                        </div>
                        <div className={classes.textWrapper}>
                            <Typography className={classes.text} variant='h3' color='inherit' align='center'>
                            Varsle din kommune om dine kommunale problemer
                            </Typography>
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
            </div>
        )
    }
}

export default withStyles(styles)(Landing);