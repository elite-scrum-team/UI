import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Services
import LocationService from '../../api/services/LocationService';
import EventService from '../../api/services/EventService';

// Material UI components
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import EventItem from './components/EventItem';
import SearchableDropdown from '../../components/miscellaneous/SearchableDropdown';

const styles = (theme) => ({
    root: {
        padding: '0 10px',
        paddingTop: 24,
        maxWidth: 1300,
        margin: 'auto',
        paddingBottom: 100,
    },
    top: {
        padding: '10px 10px 0 10px',
        minHeight: 125,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    topContent: {
        maxWidth: 1300,
        margin: 'auto',
        position: 'relative',
        minHeight: 125,

        display: 'flex',
        justifyContent: 'space-between',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: 145,
        }
    },
    locationHeader: {
        position: 'absolute',
        bottom: 0, left: 0,
        color: 'white',
        borderBottom: '2px solid white',
    },
    paper: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridGap: '12px',

        '@media only screen and (max-width: 1000px)': {
            gridTemplateColumns: '1fr',
        }
    },
    dropDown: {
        width: '80vw',
        maxWidth: 250,
    },
    progress: {
        display: 'block',
        margin: 'auto',
    }
});

class Events extends Component {

    state = {
        isLoading: true,

        municipalities: [],
        selectedMunicipality: null,
        events: [],
    }

    componentDidMount() {
        EventService.getEvents(null, (isError, data) => {
            if(isError === false) {
                this.setState({events: data});
            }
            this.setState({isLoading: false});
        });

        LocationService.getMunicipalities((isError, data) => {
            if(isError === false) {
                this.setState({municipalities: data.map(m => ({value: m.id, label: m.name}))});
            }
        });
    }

    onMunicipalityChange =  (event) => {
        this.setState({selectedMunicipality: event});

        if(event) {
            this.setState({isLoading: true});
            EventService.getEventsByMunicipality(event.value, null, (isError, data) => {
                console.log(data);
                if(isError === false) {
                    this.setState({events: data});
                }
                this.setState({isLoading: false});
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.top}>
                    <div className={classes.topContent}>
                        <div className='mt-10'>
                            <Typography variant='h4' color='inherit'>Nyheter</Typography>
                        </div>
                        <div className='mt-10'>
                            <SearchableDropdown 
                                className={classes.dropDown}
                                placeholder='Søk etter kommune'
                                onChange={this.onMunicipalityChange}
                                options={this.state.municipalities}/>
                        </div>
                        <Typography className={classes.locationHeader} variant='h6' color='inherit'>
                            {this.state.selectedMunicipality ? this.state.selectedMunicipality.label : 'Alle kommuner'}
                        </Typography>
                    </div>
                </div>
                <div className={classes.root}>
                    {this.state.isLoading ? <CircularProgress className={classes.progress} /> :
                        this.state.events && this.state.events.length > 0 ?
                        <div className={classes.paper}>
                            {this.state.events.map((value) => (
                                <EventItem
                                    key={value.id}
                                    imageLeft
                                    title={value.title}
                                    image={value.images && value.images.length > 0 ? value.images[0] : null}
                                    description={value.description}
                                    date={value.createdAt}/>
                            ))}
                        </div>
                        :
                        <Typography variant='h6' align='center'>Ingen nyheter å vise</Typography>
                    }
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Events);