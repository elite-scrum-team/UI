import React from 'react';
import { makeStyles } from '@material-ui/styles';
import warningUtils from '../../../utils/warningUtils';
import classNames from 'classnames';

// Material UI components
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = makeStyles({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    position: 'relative',
    padding: 10,
    marginBottom: 4
  },
  statusBar: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 6,
    borderRadius: 4,
    width: 4
  },
  content: {
    marginLeft: 12
  }
});

const WarningItem = props => {
  // Styling
  const classes = styles();

  const statusCode =
    props.status !== 'undefined' && props.status >= 0 && props.status <= 3
      ? props.status
      : 1;
  const statusClasses = warningUtils.getStatusClasses(statusCode)();

  return (
    <ButtonBase className={classes.root} onClick={props.onClick}>
      <Paper className={classes.paper}>
        <div className={classNames(classes.statusBar, statusClasses.color)} />
        <div className={classes.content}>
          <Typography variant='subtitle2' align='left'>
            {props.title}
          </Typography>
          <Typography variant='caption' align='left'>
            {props.description}
          </Typography>
        </div>
      </Paper>
    </ButtonBase>
  );
};

export default WarningItem;
