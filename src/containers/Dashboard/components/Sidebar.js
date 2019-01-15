import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Drawer from '@material-ui/core/Drawer';
import SearchContent from './SearchContent';

// Icons

// Project components

const drawerWidth = 325;

const styles = makeStyles({
    root: {
        width: drawerWidth,
        // '@media only screen and (max-width: 600px)': {
        //     width: '100%',
        // },
        borderRight: 'none',
    }
});

const Sidebar = props => {
  // Styling
  const classes = styles();

  return (
    <div className={classes.root}>
      <Drawer
        variant='permanent'
        classes={{
          paper: classes.root
        }}
      />
      <SearchContent {...props} />
    </div>
  );
};

export default Sidebar;
