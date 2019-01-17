import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Sidebar from './components/Sidebar';
import Hidden from '@material-ui/core/Hidden';

// Icons

// Project components
import WarningService from "../../api/services/WarningService";
import Navigation from '../../components/navigation/Navigation';
import DetailsDash from './components/DetailsDash';
import SearchContent from "./components/SearchContent";
import URLS from "../../URLS";
import PropTypes from "prop-types";
import WarningList from "./components/WarningList";
import AuthService from "../../api/services/AuthService";

const styles = {
    root: {
        marginTop: 48
    },
    sidebar: {
        '@media only screen and (max-width: 600px)': {
            width: '100%',
            marginTop: '48px',
        }
    },
}

const SEARCH_SECTION = 0;
const USER_SECTION = 1;

class Dashboard extends Component {

    state = {
        isLoading: true,
        listIsLoading: true,

        id: null,
        title: null,
        warnDate: null,
        status: 1,
        province: null,
        statusMessage: null,
        description: null,
        location: {
            lat: 0,
            lng: 0,
        },
        images: null,
        statusChange: 1,
        search: '',
        statusItems: [],
        items: [],

        showWarning: false,
    };

    getWarningId = () => this.props.match.params.id;

    goTo = page => {
        console.log(this.props);
        this.props.history.push(page);
    };

    mountWarning = (id) => {
        console.log(this.props);
        this.setState({isLoading: true});
        if (id == null) {
            if (this.getWarningId() != null) {
                this.setState({
                    id: null,
                    title: null,
                    posted: null,
                    status: 1,
                    statusMessage: null,
                    description: null,
                    location: {
                        lat: 0,
                        lng: 0,
                    },
                });
            }
            this.setState({showWarning: false});
            this.setState({isLoading: false});
        }
        else {
            WarningService.getWarning(id, (isError, e) => {
                if (isError === false) {
                    this.setState({
                        title: e.category.name,
                        posted: e.createdAt,
                        status: e.status ? e.status.type : 0,
                        statusMessage: e.status ? e.status.description : '',
                        description: e.description,
                        location: e.location,
                    });
                }
                this.setState({showWarning: true});
                this.setState({isLoading: false});
                WarningService.getWarningItems(id)
                    .then((data) => {
                        this.setState({statusItems: data});
                    });
            });
        }
    };

    getWarnings = (filters) => {
        this.setState({listIsLoading: true});
        WarningService.getWarnings({createdAt: true}, filters, (isError, data) => {
            if(isError === false) {
                console.log(data);
                this.setState({items: data});
            }
            this.setState({listIsLoading: true});
        });
    };

    onSectionChange = (value) => {
        this.setState({isLoading: true});

        if(value === SEARCH_SECTION) {
            console.log("Get warnings");
            this.getWarnings({});
        } else if(value === USER_SECTION && AuthService.isAuthenticated()) {
            console.log("Get user warnings");
            this.getWarnings({useUserId: true});
        }
    }

    componentDidMount() {
        // Get id
        const id = this.getWarningId();
        this.setState({id: id});

        this.mountWarning(id);

        this.getWarnings({});

        // WarningService.getWarnings('createdAt', (isError, data) => {
        //     if (isError === false) {
        //         console.log(data);
        //         this.setState({items: data});
        //     }
        //     this.setState({isLoading: false});
        // });

        this.setState({id: id, isLoading: false});

        console.log(this.state.id);
    }

    onSearch = (event) => {
        event.preventDefault();
    };

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <div>
                        <Hidden implementation='js' xsDown>
                            <Sidebar className={classes.sidebar}
                                     searchValue={this.state.search}
                                     items={this.state.items}
                                     onSubmit={this.onSearch}
                                     isLoading={this.state.listIsLoading}
                                     statusChange={this.state.statusChange}
                                     onChange={this.handleChange('search')}
                                     mountWarningCallback={(e) => this.mountWarning(e)}
                            />
                        </Hidden>
                        {!this.state.showWarning &&
                        <Hidden implementation='js' smUp>
                            <SearchContent className={classes.sidebar}
                                           searchValue={this.state.search}
                                           items={this.state.items}
                                           onSubmit={this.onSearch}
                                           isLoading={this.state.listIsLoading}
                                           statusChange={this.state.statusChange}
                                           onChange={this.handleChange('search')}
                                           mountWarningCallback={(e) => this.mountWarning(e)}
                            />
                        </Hidden>
                        }
                    </div>

                    <Hidden implementation='js' xsDown={!this.state.showWarning}>
                        <div className={classes.root}>
                            <DetailsDash mountWarningCallback={(e) => this.mountWarning(e)} state={this.state}/>
                        </div>
                    </Hidden>

                </div>
                {/*<Hidden implementation='js' smUp>*/}
                    {/*<div>*/}
                        {/*<DetailsDash {...this.props} mountWarningCallback={() => this.mountWarning()}*/}
                                     {/*state={this.state}/>*/}
                    {/*</div>*/}
                {/*</Hidden>*/}
            </Navigation>
        )
    }
}

export default withStyles(styles)(Dashboard);