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
  root: {
    marginTop: 48
  }
};

class Dashboard extends Component {
  state = {
    isLoading: false,
    statusChange: 1,
    search: '',
    items: [
      {
        id: 1,
        status: 2,
        title: 'Hello',
        description: 'What is going on???',
        lat: 63.426114,
        lng: 10.404609
      },
      {
        id: 2,
        status: 0,
        title: 'Hello',
        description: 'What is going on???',
        lat: 63.426734,
        lng: 10.45609
      },
      {
        id: 3,
        status: 1,
        title: 'Hello',
        description: 'What is going on???',
        lat: 63.426734,
        lng: 10.45609
      },
      {
        id: 2,
        status: 3,
        title: 'Hello',
        description: 'What is going on???',
        lat: 63.426734,
        lng: 10.45609
      }
    ]
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
            statusChange={this.state.statusChange}
          />
        </div>
      </Navigation>
    );
  }
}

export default withStyles(styles)(Dashboard);
