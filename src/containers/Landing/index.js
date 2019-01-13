import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';

// Icons
import MapIcon from '@material-ui/icons/Map';
import CloseIcon from '@material-ui/icons/Close';

// Project components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';
import Sidebar from './components/Sidebar';
import InfoModule from './components/InfoModule';
import SearchContent from './components/SearchContent';

const styles = theme => ({
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

    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
      maxWidth: '98vw',
      margin: 'auto',
    },
  },
  content: {
    marginTop: 10,
  },
  fabBtn: {
    position: 'fixed',
    bottom: 10,
    right: 10,
  }
});



class Landing extends Component {

    state = {
      isLoading: true,
      showMap: false,

      search: '',
      items: [
        {id: 1, status: 2, title: 'Hello', description: 'What is going on???', lat: 63.426114, lng: 10.404609},
        {id: 2, status: 0, title: 'Hello', description: 'What is going on???', lat: 63.426734, lng: 10.45609},
      ]
    }

    toggleChange = (name) => (event) => {
      this.setState({[name]: !this.state[name]});
    }

    handleChange = (name) => (event) => {
      this.setState({[name]: event.target.value});
    }

    goTo = (page) => {
      this.props.history.push(page);
    }

    onSearch = (event) => {
      console.log("Hello :D");
      event.preventDefault();


    }

    render() {
      const {classes} = this.props;
      return (
        <Navigation sidebar>
          <Hidden implementation='js' smDown>
            <Sidebar
              searchValue={this.state.search}
              onChange={this.handleChange('search')}
              items={this.state.items}
              onSubmit={this.onSearch}
              isLoading={this.state.isLoading}
            />
          </Hidden>

          <Hidden implementation='js' smDown={!this.state.showMap}>
            <div className={classes.root}>
              <Map locations={this.state.items}/>
            </div>
          </Hidden>
          {!this.state.showMap && <Paper className={classes.infoModule}>
            <InfoModule goTo={this.goTo}/>
          </Paper>
          }

          {!this.state.showMap &&
            <Hidden implementation='js' mdUp>
              <div className={classes.content}>
                <SearchContent
                  searchValue={this.state.search}
                  onChange={this.handleChange('search')}
                  items={this.state.items}
                  onSubmit={this.onSearch}
                  isLoading={this.state.isLoading}
                />
                
              </div>
            </Hidden>
          }
          <Hidden implementation='js' mdUp>
            <Fab className={classes.fabBtn} color='primary' onClick={this.toggleChange('showMap')}>
              {this.state.showMap ? <CloseIcon /> : <MapIcon />}
            </Fab>
          </Hidden>
        </Navigation>
      );
    }
}
export default withStyles(styles)(Landing);