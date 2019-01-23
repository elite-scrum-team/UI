import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Service
import AuthService from '../../api/services/AuthService';
import * as UserAction from '../../store/actions/UserAction';

// Material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons

// Project components
import DeleteDialog from './DeleteDialog';
import EditCategoryDialog from './EditCategoryDialog';
import StatusDialog from './StatusDialog';
import statusLabels from '../../utils/warningUtils';
import ContractDialog from './ContractDialog';
import SubscribeDialog from "./SubscribeDialog";
import URLS from "../../URLS";
import CategoryService from "../../api/services/CategoryService";

const styles = {
  root: {}
};

class ActionModule extends Component {
  state = {
    deleteDialogOpen: false,
    editCategoryDialogOpen: false,
    statusDialogOpen: false,
    contractDialogOpen: false,
    subscribeDialogOpen: false,
    subscribed: false,
    newStatus: -1,
    statusMsg: '',
    companyId: '',
    contractDesc: '',

    deleteOption: false,
    editCategoryOption: false,
    ownWarning: false,
    municipalityEmployee: false,
    userData: null,
    categories: [],
    newCategory: null,
  };

  handleNewStatus = value => {
    this.setState({ statusDialogOpen: false });
    this.props.updateStatus(value);
  };

  handleDeleteStatus = value => {
    this.handleNewStatus(value);
    this.goTo(URLS.home);
  };

    goTo = (page) => {
        this.props.history.push(page);
    };

  handleToggle = name => () => {
    this.setState({ [name]: !this.state[name] });
    console.log(this.state.categories);
  };

  handleNewContract = value => {
    this.setState({ contractDialogOpen: false });
    if(this.props.updateContract) {
      this.props.updateContract(value);
    }
  };

  newCategoryClick = (data) => {
      this.setState({newCategory: data});
  };

    updateCategory = () => {
        
    };

  toggleOptions = async () => {
      this.setState({userData: await AuthService.getUserData()});
      if (this.state.userData !== null) {

            if (this.state.userData.roles){
                for (let i = 0; i < this.state.userData.roles.groups.length; i++){
                    console.log(this.state.userData.roles.groups[i].municipalityId + '\n' + this.props.municipalityId);
                    if (this.state.userData.roles.groups[i].municipalityId === this.props.municipalityId){
                        this.setState({deleteOption: true, editCategoryOption: true});
                        CategoryService.getCategories((isError, data) => {
                            console.log(data);
                            if(isError) {
                                console.log('Error fetching categories');
                            } else {
                                this.setState({categories: data});
                            }
                            this.setState({isLoading: false});
                        });
                    }
                }
            }

          console.log(this.props.status);

          if (this.props.userId === this.state.userData.id && this.props.status === 0){
              this.setState({deleteOption: true});
          }
      }

  };

  componentDidMount () {
      this.toggleOptions();
  }

    handleSub = value => {
        this.setState({subscribeDialogOpen: false,
            subscribed: value});
    };

  render() {
    // Styling
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <Typography variant={'h6'}>Actions:</Typography>
          <List component='nav' className={classes.root} dense>
            {this.state.deleteOption && (
              <div>
                <ListItem
                  button
                  onClick={() => this.setState({ deleteDialogOpen: true })}
                >
                  <ListItemText primary='Slett varsel' />
                </ListItem>
                <Divider />
              </div>
            )}
              {this.state.editCategoryOption && (
                  <div>
                      <ListItem
                          button
                          onClick={() => this.setState({ editCategoryDialogOpen: true })}
                      >
                          <ListItemText primary='Endre kategori' />
                      </ListItem>
                      <Divider />
                  </div>
              )}
            <ListItem button dense>
              <ListItemText primary='Varsle meg ved endringer'
                            onClick={() => this.setState({ subscribeDialogOpen: true })}
              />
            </ListItem>
            <Divider />

            {(AuthService.isEmployee(this.props.municipalityId) && (
              <Fragment>
                <ListItem
                  button
                  dense
                  divider
                  onClick={() => this.setState({ contractDialogOpen: true })}
                >
                  <ListItemText primary='Registrer kontrakt' />
                </ListItem>
                <Divider light />
                <ListItem
                  button
                  dense
                  onClick={() => this.setState({ statusDialogOpen: true })}
                >
                  <ListItemText primary='Ny status' />
                </ListItem>
                <Divider light />
              </Fragment>
            )) ||
              (this.props.constracts && (AuthService.isSelectedGroup(this.props.contracts.map(c => c.groupId)) && (
                <Fragment>
                  <ListItem
                    button
                    dense
                    onClick={() => this.setState({ statusDialogOpen: true })}
                  >
                    <ListItemText primary='Ny status' />
                  </ListItem>
                  <Divider light />
                </Fragment>
              )))}
          </List>
        </div>
        <DeleteDialog
          open={this.state.deleteDialogOpen}
          onClose={this.handleToggle('deleteDialogOpen')}
          submitStatus={this.handleDeleteStatus}
          cancel={this.cancelDialog}
          statusNames={statusLabels}
        />
          <EditCategoryDialog
              open={this.state.editCategoryDialogOpen}
              onClose={this.handleToggle('editCategoryDialogOpen')}
              //submitEdit={}
              categories={this.state.categories}
              newCategory={this.state.newCategory}
              cancel={this.cancelDialog}
              statusNames={statusLabels}
              newCategoryClick={(category) => this.newCategoryClick(category)}
              updateCategory={() => this.updateCategory()}
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
        <SubscribeDialog
          open={this.state.subscribeDialogOpen}
          onClose={this.handleToggle('subscribeDialogOpen')}
          submitSubscribe={this.handleSub}
          subscribed={this.state.subscribed}
        />
      </div>
    );
  }
}

ActionModule.propTypes = {};

const mapStoreToProps = state => ({
  companies: UserAction.getUserData(state).roles.groups,
  selectedGroup: UserAction.getUserData(state).selectedGroup || {},
});

export default connect(mapStoreToProps)(withStyles(styles)(withRouter(ActionModule)));
