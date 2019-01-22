import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Drawer from '@material-ui/core/Drawer';

// Icons

// Project components
import SearchContent from './SearchContent';

const drawerWidth = 450;

const styles = makeStyles({
  root: {
    width: drawerWidth,
    borderRight: 'none',
    marginTop: 50
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
      >
        <SearchContent {...props}
                       mountWarningCallback={(e) => props.mountWarningCallback(e)}
        />
      </Drawer>
    </div>
  );
};

export default Sidebar;
