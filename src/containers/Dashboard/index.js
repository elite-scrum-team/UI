import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navigation from '../../components/navigation/Navigation';

// Material UI components
import Sidebar from './components/Sidebar';
import Typography from '@material-ui/core/Typography';
import { AutoComplete } from 'material-ui';

// Icons

// Project components

const styles = {
  root: {}
};

class Dashboard extends Component {
  state = {
    isLoading: false
  };

  render() {
    const { classes } = this.props;

    return (
      <Navigation sidebar isLoading={this.state.isLoading}>
        <div className={classes.root}>
          <Sidebar
            searchValue={this.state.search}
            items={this.state.items}
            onSubmit={this.onSearch}
            isLoading={this.state.isLoading}
          />
        </div>
      </Navigation>
    );
  }
}

export default withStyles(styles)(Dashboard);
