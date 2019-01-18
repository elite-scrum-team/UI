import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';

// Services
import GeoService from '../../api/services/GeoService';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

// Services
import LocationService from '../../api/services/LocationService';

// Icons
import Logo from '../../assets/img/logo.png';
import LocationIcon from '@material-ui/icons/LocationOn';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PersonIcon from '@material-ui/icons/Person';

// Project components
import SearchableDropdown from '../../components/miscellaneous/SearchableDropdown';

const styles = {
    root: {
        position: 'relative',
        height: '100vh',
        width: '100vw',

        background: 'url(http://paperlief.com/images/snow-mountain-landscape-wallpaper-1.jpg)',
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',

        maxHeight: '100vh',
        overflow: 'hidden', 
    },
    content: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        
        width: '100vw',
        maxWidth: 900,
        margin: 'auto',
        padding: 30,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '@media only screen and (max-width: 600px)': {
            padding: '30px 30px',
            width: '76vw',
        }
    },
    logo: {
        width: '100%',
        maxWidth: 450,
        height: 'auto',
        objectFit: 'cover',
    },
    input: {
        width: '80vw',
        maxWidth: 500,
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 12,
        maxWidth: 400,

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
                <div className={classes.content}>
                    <Paper className={classes.paper} elevation={5}>
                        <img className={classes.logo} src={Logo} />
                        <div className='pt-10 pb-20'>
                            <Typography variant='h5' align='center'>
                                Varsle din kommune om dine kommunale problemer
                            </Typography>
                        </div>
                        <div className={classes.buttonWrapper}>
                            <Button onClick={() => this.goTo(URLS.createwarning)} variant='outlined' size='medium' color='error'>Send varsel<FeedbackIcon className='ml-5' /></Button>
                            <Button onClick={() => this.goTo(URLS.login)} variant='outlined' size='medium' color='primary'><PersonIcon className='mr-5'/> Logg inn</Button>
                        </div>
                        <div className='pt-20 pb-20 w-100'>
                            <SearchableDropdown
                                className={classes.input}
                                options={this.state.municipalities}
                                onChange={this.onMunicipalitySelected}
                                placeholder='Søk etter kommune'
                                />
                        </div>
                        <Typography variant='caption' align='center'>
                                eller
                        </Typography>
                        <div className='mt-15'>
                            <Fab
                                onClick={this.searchByLocation}
                                size='medium'
                                variant='extended'
                                color='primary'>
                                <LocationIcon className='mr-5'/>
                                Søk med min posisjon
                            </Fab>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Landing);