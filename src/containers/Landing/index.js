import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';

import WarningItem from './components/WarningItem'

const drawerWidth = 360;

const styles = {
  root: {
    width: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    height: '100vh',
  },
  drawerPaper: {
    width: 320,
  },
}

class Landing extends Component {

    render() {
      const {classes} = this.props;
      return (
        <Navigation sidebar>
          <div className={classes.root}>
            <Map />
          </div>
          <SideDrawer />
        </Navigation>
      )
    }
}

const SideDrawer = withStyles(styles) ((props) => {
  const {classes} = props;
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <SimpleTabs/>
    </Drawer>
  )
});

class SimpleTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar position='static'>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label='Dine varsler' />
            <Tab label='Andre varsler' />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
            <WarningItem/>
            <WarningItem/>
        </TabContainer>}
        {value === 1 && <TabContainer>Andre varsler</TabContainer>}
      </div>
    );
  }
}


function TabContainer(props) {
  return (
    <List component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </List>
  );
}

export default withStyles(styles)(Landing);