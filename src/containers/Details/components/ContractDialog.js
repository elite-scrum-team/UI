import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import SearchableDropdown from '../../../components/miscellaneous/SearchableDropdown';
import MessageDialog from '../../../components/miscellaneous/MessageDialog';
import TextField from '@material-ui/core/TextField';

import ContractService from '../../../api/services/ContractService';

const styles = {
  root: {},
  content: {
    minHeight: 100
  },
  textField: {
    width: 500,

    '@media only screen and (max-width: 800px)': {
      width: 300
    }
  }
};

class ContractDialog extends Component {
  state = {
    companyId: null,
    contractMsg: null,
    companies: []
  };
  componentDidMount() {
    console.log('DID MOUNT');
    ContractService.getAllCompanies((isError, data) => {
      console.log('GOT HERE, ', data);
      if (!isError) {
        this.setState({
          companies: data.map(c => ({ value: c.id, label: c.name }))
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.setState({ companyId: null });
    }
  }

  handleNewContract = () => {
    this.props.submitContract({
      companyId: this.state.companyId,
      description: this.state.contractMsg
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  //Company can't be handled by handleChange, because the SearchableDropdown event does not have a .target property
  handleCompanySelect = event => {
    this.setState({ companyId: event.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MessageDialog
          className={classes.msgDia}
          title='Etabler kontrakt'
          actions={[
            { label: 'Avbryt', action: this.props.onClose },
            {
              label: 'Send',
              action: this.handleNewContract,
              disabled: !this.state.companyId
            }
          ]}
          open={this.props.open}
        >
          <div className={classes.content}>
            <SearchableDropdown
              className={classes.dropdown}
              options={this.state.companies}
              onChange={this.handleCompanySelect}
            />
            <TextField
              id='filled-email-input'
              label='Kontraktmelding'
              className={classes.textField}
              type='ContractMessage'
              name='ContractMessage'
              autoComplete='contractMsg'
              margin='normal'
              onChange={this.handleChange('contractMsg')}
            />
          </div>
        </MessageDialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContractDialog);
