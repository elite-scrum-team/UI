import React, { Component, Fragment} from 'react';
import { withStyles } from '@material-ui/styles';
import {Typography} from "@material-ui/core";

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


const styles = {
    root: {
        
    }
};


class ActionModule extends Component {


    state = {
        deleteDialogOpen: false,
        statusDialogOpen: false,
        contractDialogOpen: false,
        newStatus: -1,
        statusMsg: '',
        companyId: '',
        contractDesc: '',
        ownWarning: false,
        userData: null,
    };

    handleNewStatus = (value) => {
        this.setState({statusDialogOpen: false});
        this.props.updateStatus(value);
    };

    handleToggle = (name) => () => {
        this.setState({[name]: !this.state[name]});
    };

    handleNewContract = (value) => {
        this.setState({contractDialogOpen: false});
        this.props.updateContract(value);
    };

    loggo = async () => {
        this.setState({userData: await AuthService.getUserData()});
        console.log(this.state.userData);
        console.log(this.state.userData.id);
        //console.log(this.props.warningUserId);

    };

    componentDidMount() {
        this.loggo();
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

                        {AuthService.isEmployee(this.props.municipalityId) &&
                            <Fragment>
                                <ListItem button dense divider onClick={()=> this.setState(({contractDialogOpen: true}))}>
                                    <ListItemText primary="Registrer kontrakt" />
                                </ListItem>
                                <Divider light />
                                <ListItem button dense onClick={() => this.setState({statusDialogOpen: true})}>
                                    <ListItemText primary="Ny status" />
                                </ListItem>
                                <Divider light />
                            </Fragment>
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

export default withStyles(styles)(ActionModule);