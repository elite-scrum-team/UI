import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';
import Sidebar from './components/Sidebar';
import InfoModule from './components/InfoModule';

const styles = {
  root: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: '100vh',
    marginTop: '-48px',
    position: 'relative',
  },
  drawerPaper: {
    width: 320,
  },
  infoModule: {
    position: 'absolute',
    top: 70, right: 20,
    width: 400,
  }
}

class Landing extends Component {

    state = {
      search: '',
    }

    handleChange = (name) => (event) => {
      this.setState({[name]: event.target.value});
    }

    goTo = (page) => {
      this.props.history.push(page);
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
          <Paper className={classes.infoModule}>
            <InfoModule goTo={this.goTo}/>
          </Paper>
        </Navigation>
      );
    }
}
export default withStyles(styles)(Landing);