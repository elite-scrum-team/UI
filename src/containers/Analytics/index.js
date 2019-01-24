import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import theme from '../../theme';
import {timeData, getDateData} from './helpers';
import classNames from 'classnames';

// Service imports
import LocationService from '../../api/services/LocationService';

// Material UI components
import Typography from '@material-ui/core/Typography';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import SearchableDropdown from '../../components/miscellaneous/SearchableDropdown';

import NumberDataDisplay from './components/NumberDataDisplay';
import MainDataDisplay from './components/MainDataDisplay';

const styles = {
    root: {
        //paddingTop: 28,
        padding: 28,
        maxWidth: 1800,
        margin: 'auto',
        paddingBottom: 100,
    },
    topContent: {
        margin: 'auto',
        maxWidth: 1800,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',

        '@media only screen and (max-width: 1000px)': {
            justifyContent: 'flex-start',
            flexDirection: 'column',
        }
    },
    top: {
        padding: 20,
        backgroundColor: theme.palette.primary.main,
    },
    section: {
        marginTop: 20,
    },
    inputs: {
        display: 'flex',
        alignItems: 'center',
        '@media only screen and (max-width: 800px)': {
            flexDirection: 'column',
            marginTop: 18,
        }
    },
    input: {
        width: '80vw',
        maxWidth: 240,
        '@media only screen and (max-width: 800px)': {
            marginBottom: 10,
            maxWidth: '100%',
            marginRight: 10,
            marginLeft: 10,
        }
    },
}

class Analytics extends Component {

    constructor() {
        super();
        this.state = {
            timeState: timeData[0],
            municipalities: [],
            municipality: null,
        };

        this.mainDataDisplayer = React.createRef();
        this.numberDataDisplayer = React.createRef();
    }

    componentDidMount() {
        this.fetchMunicipalities();

        this.fetchData();
    }

    fetchData() {
        const timeObject = getDateData(this.state.timeState.value);
        const municipalityId = this.state.municipality ? this.state.municipality.value : null;

        this.mainDataDisplayer.reloadData(timeObject, municipalityId);
        this.numberDataDisplayer.reloadData(timeObject, municipalityId);
    }

    fetchMunicipalities() {
        LocationService.getMunicipalities((isError, data) => {
            if(isError === false) {
                this.setState({municipalities: data.map(m => ({value: m.id, label: m.name}))});
            }
        });
    }

    onMunicipalityChange = async (value) => {
        await this.setState({municipality: value});

        const timeObject = getDateData(this.state.timeState.value);
        const municipalityId = this.state.municipality ? this.state.municipality.value : null;

        this.mainDataDisplayer.reloadData(timeObject, municipalityId);
        this.numberDataDisplayer.reloadData(timeObject, municipalityId);
    }

    onTimeChange = async (value) => {
        await this.setState({timeState: value});

        const timeObject = getDateData(this.state.timeState.value);
        const municipalityId = this.state.municipality ? this.state.municipality.value : null;

        this.mainDataDisplayer.reloadData(timeObject, municipalityId);
        this.numberDataDisplayer.reloadData(timeObject, municipalityId);
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.top}>
                    <div className={classes.topContent}>
                        <Typography variant='h3' color='inherit'>
                            {this.state.municipality ? `Statistikk i ${this.state.municipality.label}` : 'Nasjonal Statistikk'}
                        </Typography>
                        <div className={classes.inputs}>
                            <SearchableDropdown
                                className={classes.input}
                                placeholder='Tid'
                                value={this.state.timeState}
                                options={timeData}
                                onChange={this.onTimeChange}/>
                            <SearchableDropdown
                                className={classNames(classes.input, 'ml-5')}
                                placeholder='Søk etter kommune'
                                value={this.state.municipality}
                                options={this.state.municipalities}
                                onChange={this.onMunicipalityChange}/>
                        </div>
                    </div>
                </div>
                <div className={classes.root}>
                    <NumberDataDisplay innerRef={el => this.numberDataDisplayer = el} />
                    <div className={classes.section}>
                        <MainDataDisplay innerRef={el => this.mainDataDisplayer = el} />
                    </div>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Analytics);