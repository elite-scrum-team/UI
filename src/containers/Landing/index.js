import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';
import Recover from '../../components/Recover';
import { Hidden } from '@material-ui/core';

const styles = {
  root: {
    width: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    height: '100vh',
  },
  inline: {
    display: 'inline',
  },
}

class Landing extends Component {

    render() {
      const {classes} = this.props;
      return (
        <Navigation>
          <div className={classes.root}>
            <Map/>
          </div>
          
        </Navigation>
      )
    }
}
const AlignItemsList = withStyles(styles)((props) => {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="aImg" src="imgSource" />
        </ListItemAvatar>
        <ListItemText
          primary="Hull i veien ved Vestregate 3"
          secondary={
              "Det har vært der en stund og det hadde vært fint om dere kunne fikse det"
          }
        />
      </ListItem>
    </List>
  );
});

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);