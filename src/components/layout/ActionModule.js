import React, { Component, Fragment} from 'react';
import { withStyles } from '@material-ui/styles';
import {Typography} from "@material-ui/core";
import {connect} from 'react-redux';


// Service
import AuthService from '../../api/services/AuthService';

// Material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons

// Project components
import DeleteDialog from './DeleteDialog';
import StatusDialog from './StatusDialog';
import statusLabels from '../../utils/warningUtils';
import ContractDialog from "./ContractDialog";
import * as UserAction from "../../store/actions/UserAction";


const styles = {
    root: {
        
    }
};

class ActionModule extends Component {
    state = {
        selected: null,
        deleteDialogOpen: false,
        statusDialogOpen: false,
        contractDialogOpen: false,
        newStatus: -1,
        statusMsg: '',
        companyId: '',
        contractDesc: '',

        ownWarning: true,
    };

    componentDidMount() {
        this.init();
    }

    init = async () => {
        if(this.props.company === null){
            console.log(this.props.companies);
            const defaultGroup = this.props.companies.find(e => e.municipalitiyId !== null) || this.props.companies[0];
            await this.setState({selected: defaultGroup});
            console.log(this.state, defaultGroup);
        }
    };

    checkContract = () => {
        return this.props.contracts ? this.props.contracts.find(e => e.groupId):false;
    };

    handleNewStatus = (value) => {
        this.setState({statusDialogOpen: false});
        this.props.updateStatus(value);
    };

    handleToggle = (name) => (event) => {
        this.setState({[name]: !this.state[name]});
    };

    handleNewContract = (value) => {
        this.setState({contractDialogOpen: false});
        this.props.updateContract(value);
    };

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div>
                    <Typography variant={"h6"}>
                        Actions:
                    </Typography>
                    <List component="nav" className={classes.root} dense>
                        {this.state.ownWarning &&
                        <div>
                            <ListItem button onClick={() => this.setState(({deleteDialogOpen: true}))}>
                                <ListItemText primary="Slett varsel"/>
                            </ListItem>
                            <Divider/>
                        </div>
                        }
                        <ListItem button dense>
                            <ListItemText primary="Varsle meg ved endringer" />
                        </ListItem>
                        <Divider />

                        {(AuthService.isEmployee(this.props.municipalityId) &&
                            <Fragment>
                                <ListItem button dense divider onClick={()=> this.setState(({contractDialogOpen: true}))}>
                                    <ListItemText primary="Registrer kontrakt" />
                                </ListItem>
                                <Divider light />
                                <ListItem button dense onClick={() => this.setState({statusDialogOpen: true})}>
                                    <ListItemText primary="Ny status" />
                                </ListItem>
                                <Divider light />
                            </Fragment>)
                            ||
                        (this.checkContract() &&
                            <Fragment>
                                <ListItem button dense onClick={() => this.setState({statusDialogOpen: true})}>
                                    <ListItemText primary="Ny status" />
                                </ListItem>
                                <Divider light />
                            </Fragment>
                        )
                        }

                    </List>
                </div>
                <DeleteDialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleToggle('deleteDialogOpen')}
                    submitStatus={this.handleNewStatus}
                    cancel={this.cancelDialog}
                    statusNames={statusLabels}
                />
                <StatusDialog
                    open={this.state.statusDialogOpen}
                    onClose={this.handleToggle('statusDialogOpen')}
                    submitStatus={this.handleNewStatus}
                    cancel={this.cancelDialog}
                    statusNames={statusLabels}
                />
                <ContractDialog
                    open={this.state.contractDialogOpen}
                    onClose={this.handleToggle('contractDialogOpen')}
                    submitContract={this.handleNewContract}

                />
            </div>
        )
    }
}

ActionModule.propTypes = {

};

const mapStoreToProps = (state) => ({
    companies: UserAction.getUserData(state).roles.groups,
});

export default connect(mapStoreToProps)(withStyles(styles)(ActionModule));