import React from 'react';
import { withStyles } from '@material-ui/styles';

// Material UI components
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";

// Icons
import Send from '@material-ui/icons/Send';

// Project components

const styles = {
  root: {

  }
}

const WarningItem = withStyles(styles) ((props) => {
  return (
    <div>
      <ListItem className='listItem' alignItems="flex-start" button>
        <ListItemIcon><Send /></ListItemIcon>
        <ListItemText
          className='listItemText'
          primary='Pothole at Times Square'
          secondary={ <Typography noWrap>It is a giant whole n the middle of the street plz help</Typography>}
        />
      </ListItem>
      <Divider />
    </div>
  )
});

export default withStyles(styles) (WarningItem);