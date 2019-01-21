import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Service imports
import AuthService from '../../api/services/AuthService';
import ContractService from '../../api/services/ContractService';

// Material UI components
import Sidebar from './components/Sidebar';
import Hidden from '@material-ui/core/Hidden';

// Icons

// Project components
import WarningService from "../../api/services/WarningService";
import Navigation from '../../components/navigation/Navigation';
import DetailsDash from './components/DetailsDash';
import SearchContent from "./components/SearchContent";

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
};

const NEW_SECTION = 0;
const ACTIVE_SECTION = 1;
const DONE_SECTION = 2;

class Dashboard extends Component {

    state = {
        isLoading: false,
        listIsLoading: false,

        id: null,
        title: null,
        warnDate: null,
        status: 1,
        province: null,
        statusMessage: null,
        description: null,
        contracts: null,
        location: {
            lat: 0,
            lng: 0,
        },
        images: null,
        statusChange: 1,
        search: '',
        warningItems: [],

        items: [],

        showWarning: false,
    };

    getWarningId = () => this.props.match.params.id;

    componentDidMount() {
        this.setState({isLoading: true, listIsLoading: true});
        AuthService.getUserData((isError, data) => {
            if(isError === false) {
                // Get id
                const id = this.getWarningId();
                this.setState({id: id});

                const currentGroup = AuthService.getCurrentGroup();
                
                if(currentGroup) {
                    this.onSectionChange(NEW_SECTION);
                } else {
                    this.setState({listIsLoading: false});
                }
            } else {
                //this.props.history.push(URLS.home);
            }
            this.setState({isLoading: false});
        });   
    }

    goTo = page => {
        this.props.history.push(page);
    };

    mountWarning = (warningId) => {
        const id = warningId || this.getWarningId();
        if(id == null) {
            this.setState({showWarning: false })
        }
        else {

            this.setState({isLoading: true});
            WarningService.getWarning(id, (isError, e) => {
                if (isError === false) {
                    console.log("Warning: ", e);
                    this.setState({
                        id: e.id,
                        title: e.category.name,
                        posted: e.createdAt,
                        status: e.status ? e.status.type : 0,
                        statusMessage: e.status ? e.status.description : '',
                        description: e.description,
                        location: e.location,
                        images: e.images,
                        municipality: e.municipality,
                        userId: e.userId,
                        municipalityId: e.municipalityId,
                        contracts: e.contracts,
                        city: e.city,
                        street: e.street,
                        showWarning: true,
                    });

                    WarningService.getWarningItems(id)
                    .then((data) => {
                        this.setState({warningItems: data});
                    });
                }
                this.setState({isLoading: false});
            });
        }
    };

    getWarnings = (filters) => {
        this.setState({listIsLoading: true});
        WarningService.getWarnings(null, filters, (isError, data) => {
            if(isError === false) {
                this.setState({items: data, });
            }
            this.setState({listIsLoading: false});
        });
    };

    onSectionChange = (value) => {

        const extraFilter = {dateSort: 'ASC'};

        // Add group filters
        const selectedGroup = AuthService.getCurrentGroup();
        if(!selectedGroup) {
            return;
        }

        // Add municipality filter is exists, if not group filter
        if (selectedGroup.municipalityId !== null){
            extraFilter.municipality = selectedGroup.municipalitiyId;
        }else{
            extraFilter.groupId = selectedGroup.id;
        }

        if(value === NEW_SECTION) {
            this.getWarnings({...extraFilter, onlyStatus: [0]});
        } else if(value === ACTIVE_SECTION) {
            this.getWarnings({...extraFilter, onlyStatus: [1,2]});
        } else if(value === DONE_SECTION) {
            this.getWarnings({...extraFilter, onlyStatus: [3,4]});
        }
    };

    groupSelect = (selectedGroup) => {
        if(selectedGroup) {
            AuthService.setCurrentGroup(selectedGroup);
            this.onSectionChange(NEW_SECTION);
        }
    };

    onSearch = (event) => {
        event.preventDefault();
    };

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    changeStatus = (newStatus) => {
        const status = newStatus.status;

        WarningService.createStatus(this.getWarningId(), status , newStatus.statusMsg)
        .then((data) => {
            WarningService.getWarningItems(this.getWarningId())
            .then((itemData) => {
                this.setState({warningItems: itemData, status: status});
            })
        });
    };

    changeContract = newContract => {
        const warningId = this.getWarningId();
        ContractService.createContract(
          warningId,
          newContract.companyId,
          newContract.description
        ).then(data => {
          WarningService.getWarningItems(this.getWarningId()).then(data => {
            this.setState({ warningItems: data });
          });
        });
    
    };

    onCommentCreated = () => {
        WarningService.getWarningItems(this.getWarningId()).then(data => {
          this.setState({ warningItems: data });
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Navigation
                dashboard
                selectGroup={this.groupSelect}
                isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <div>
                        <Hidden implementation='js' xsDown>
                            <Sidebar
                                className={classes.sidebar}
                                searchValue={this.state.search}
                                items={this.state.items}
                                onSubmit={this.onSearch}
                                isLoading={this.state.listIsLoading}
                                onSectionChange={this.onSectionChange}
                                statusChange={this.state.statusChange}
                                onChange={this.handleChange('search')}
                                mountWarningCallback={(id) => this.mountWarning(id)}
                            />
                        </Hidden>
                        {!this.state.showWarning &&
                        <Hidden implementation='js' mdUp>
                            <SearchContent className={classes.sidebar}
                                searchValue={this.state.search}
                                items={this.state.items}
                                onSubmit={this.onSearch}
                                isLoading={this.state.listIsLoading}
                                onSectionChange={this.onSectionChange}
                                statusChange={this.state.statusChange}
                                onChange={this.handleChange('search')}
                                mountWarningCallback={(id) => this.mountWarning(id)}
                            />
                        </Hidden>
                        }
                    </div>

                    <Hidden implementation='js' xsDown={!this.state.showWarning}>
                        <div className={classes.root}>
                            {!this.state.isLoading && this.state.showWarning &&
                                <DetailsDash
                                    mountWarningCallback={(id) => this.mountWarning(id)}
                                    state={this.state}
                                    showWarning={this.state.showWarning}
                                    changeStatus={this.changeStatus}
                                    changeContract={this.changeContract}
                                    onCommentCreated={this.onCommentCreated}
                                    warningId={this.state.id}
                                />
                            }
                        </div>
                    </Hidden>

                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Dashboard);
