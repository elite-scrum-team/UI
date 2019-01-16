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
import SearchContent from "../Landing/components/SearchContent";
import URLS from "../../URLS";
import PropTypes from "prop-types";
import WarningList from "./components/WarningList";

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

class Dashboard extends Component {

    state = {
        isLoading: false,

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
                this.setState({isLoading: false});
                WarningService.getWarningItems(id)
                    .then((data) => {
                        this.setState({statusItems: data});
                    });
            });
        }
    };

    componentDidMount() {
        // Get id
        const id = this.getWarningId();
        this.setState({id: id});

        this.mountWarning(id);

        WarningService.getWarnings('createdAt', (isError, data) => {
            if (isError === false) {
                console.log(data);
                this.setState({items: data});
            }
            this.setState({isLoading: false});
        });

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
                    {!this.state.showWarning &&
                    <div>
                        <Hidden implementation='js' xsDown>
                            <Sidebar className={classes.sidebar}
                                     searchValue={this.state.search}
                                     items={this.state.items}
                                     onSubmit={this.onSearch}
                                     isLoading={this.state.isLoading}
                                     statusChange={this.state.statusChange}
                                     onChange={this.handleChange('search')}
                                     mountWarningCallback={(e) => this.mountWarning(e)}
                            />
                        </Hidden>
                        <Hidden implementation='js' smUp>
                            <SearchContent className={classes.sidebar}
                                           searchValue={this.state.search}
                                           items={this.state.items}
                                           onSubmit={this.onSearch}
                                           isLoading={this.state.isLoading}
                                           statusChange={this.state.statusChange}
                                           onChange={this.handleChange('search')}
                                           mountWarningCallback={(e) => this.mountWarning(e)}
                            />
                        </Hidden>
                    </div>
                    }
                    <Hidden implementation='js' xsDown={!this.state.showWarning}>
                        <div className={classes.root}>
                            <DetailsDash state={this.state}/>
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