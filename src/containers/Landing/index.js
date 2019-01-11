import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';
import Sidebar from './components/Sidebar';

const styles = {
  root: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: '100vh',
    marginTop: '-48px',
  },
  drawerPaper: {
    width: 320,
  },
}

class Landing extends Component {

    state = {
      search: '',
    }

    handleChange = (name) => (event) => {
      this.setState({[name]: event.target.value});
    }

    render() {
      const {classes} = this.props;
      return (
        <Navigation sidebar>
          <Sidebar
            searchValue={this.state.search}
            onChange={this.handleChange('search')}
            items={[
              {id: 1, status: 2, title: 'Hello', description: 'What is going on???'},
              {id: 2, status: 0, title: 'Hello', description: 'What is going on???'},
            ]}
          />
          <div className={classes.root}>
            <Map/>
          </div>
        </Navigation>
      );
    }
}
export default withStyles(styles)(Landing);