import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Services
import LocationService from '../../api/services/LocationService';
import EventService from '../../api/services/EventService';
import AuthService from "../../api/services/AuthService";

// Material UI components
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Button from "@material-ui/core/Button";

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import EventItem from './components/EventItem';
import SearchableDropdown from '../../components/miscellaneous/SearchableDropdown';
import Sidebar from "./components/Sidebar";
import DetailCard from './components/DetailCard';
import URLS from "../../URLS";

const drawerWidth = 450;

const styles = (theme) => ({
    root: {
        position: 'relative',
        transition: 'all 0.5s ease',
    },
    container: {
        padding: '0 10px',
        paddingTop: 24,
        maxWidth: 1300,
        margin: 'auto',
        paddingBottom: 100,
    },
    mLeft: {
        marginLeft: drawerWidth,

        '@media only screen and (max-width: 960px)': {
            marginLeft: 0,
        }
    },
    top: {
        padding: '10px 10px 0 10px',
        minHeight: 125,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    },
    employeeTools: {
        padding: '10px 10px 10px 40px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        minHeight: 30,
        backgroundColor: theme.palette.primary.main,
        color: 'gray',
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
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '12px',

        '@media only screen and (max-width: 1200px)': {
            gridTemplateColumns: '1fr 1fr',
        },

        '@media only screen and (max-width: 1000px)': {
            gridTemplateColumns: '1fr',
        }
    },
    oneRow: {
        '@media only screen and (max-width: 1600px)': {
            gridTemplateColumns: '1fr 1fr',
        },

        '@media only screen and (max-width: 1300px)': {
            gridTemplateColumns: '1fr',
        }
    },
    toColumn: {
        '@media only screen and (max-width: 1450px)': {
            flexDirection: 'column',
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
        isEmployee: false,
        userData: null,
        detail: null
    }

    toggleEmployeeOptions = async () => {
        this.setState({userData: await AuthService.getUserData()});
        if (this.state.userData !== null) {
            if (this.state.userData.group) {
                for (let i = 0; i < this.state.userData.group.length; i++) {
                    if (this.state.userData.group[i].municipalitiy) {
                        this.setState({isEmployee: true});
                        return;
                    }
                }
            }
        }
    };

    componentDidMount() {
        EventService.getEvents(null, (isError, data) => {
            console.log(data);
            if (isError === false) {
                this.setState({events: data});
            }
            this.setState({isLoading: false});
        });

        LocationService.getMunicipalities((isError, data) => {
            if (isError === false) {
                this.setState({municipalities: data.map(m => ({value: m.id, label: m.name}))});
            }
        });
        this.toggleEmployeeOptions();
    }

    onItemClick = (item) => () => {
        this.setState({
            detail: item
        })
    };

    onMunicipalityChange = (event) => {
        this.setState({selectedMunicipality: event});

        if (event) {
            this.setState({isLoading: true});
            EventService.getEventsByMunicipality(event.value, null, (isError, data) => {
                console.log(data);
                if (isError === false) {
                    this.setState({events: data});
                }
                this.setState({isLoading: false});
            });
        }
    };


    goTo = (page) => {
        this.props.history.push(page);
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classNames(classes.root, {[classes.mLeft]: this.state.detail !== null})}>


                    <div className={classes.top}>
                        <div className={classes.topContent}>
                            <div className='mt-10'>
                                <Typography variant='h4' color='inherit'>Arrangmenter</Typography>
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
                    <Hidden implementation='js' smDown={this.state.detail !== null}>
                        <div className={classNames(classes.container)}>
                            {this.state.isLoading ? <CircularProgress className={classes.progress}/> :

                                this.state.events && this.state.events.length > 0 ?

                                    <div
                                        className={classNames(classes.paper, this.state.detail !== null ? classes.oneRow : '')}>
                                        {this.state.events.map((value) => (
                                            <EventItem
                                                className={this.state.detail !== null ? classes.toColumn : ''}
                                                key={value.id}
                                                imageLeft
                                                viewingDetail={this.state.detail !== null}
                                                title={value.title}
                                                image={value.images && value.images.length > 0 ? value.images[0] : null}
                                                description={value.description}
                                                date={value.createdAt}
                                                municipality={value.municipality}
                                                city={value.city}
                                                street={value.street}
                                                onClick={this.onItemClick(value)}
                                            />
                                        ))}
                                    </div>
                                    :
                                    <Typography variant='h6' align='center'>Ingen nyheter å vise</Typography>
                            }
                        </div>
                    </Hidden>

                    <Fragment>
                        <Hidden implementation='js' smDown>
                            <Sidebar goTo={(page) => this.goTo(page)} open={this.state.detail !== null} event={this.state.detail}
                                     close={this.onItemClick(null)}/>
                        </Hidden>
                        {this.state.detail && <Hidden implementation='js' mdUp>
                            <DetailCard event={this.state.detail} close={this.onItemClick(null)}/>
                        </Hidden>}
                    </Fragment>

                </div>
                <div hidden={!this.state.isEmployee} className={classes.employeeTools}>
                    <Button variant="contained" size={'large'} color='secondary'
                            className={classes.registerButton}
                            onClick={() => this.goTo(URLS.createnews)}>
                        Registrer nyhet
                    </Button>
                </div>

            </Navigation>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Events);
