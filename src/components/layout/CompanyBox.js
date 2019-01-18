import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

// Material UI components
import Paper from '@material-ui/core/es/Paper/Paper';
import Typography from '@material-ui/core/es/Typography/Typography';

// Icons
import Business from '@material-ui/icons/Business';

// Project components

const styles = makeStyles({
  root: { marginTop: 10, display: 'flex' },
  topright: {
    position: 'absolute',
    top: 4,
    right: 8
  },
  messageText: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%'
  },
  icon: { top: 4, bottom: 4, left: 4 },
  business: {
    display: 'flex',
    padding: 8,
    backgroundColor: 'whitesmoke',
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const CompanyBox = props => {
  const time = props.date ? moment(props.date).fromNow() : 'Ukjent';
  const classes = styles();
  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.business}>
        <Business className={classes.icon} />
      </div>
      <div className={classes.messageText}>
        <div>
          <Typography className={classes.companymessage} variant='body2'>
            {props.companyName} har blitt tildelt denne oppgaven.
          </Typography>
          <Typography color='textSecondary' variant='caption'>
            {props.breadtext}
          </Typography>
        </div>
        <Typography variant={'caption'} className={classes.topright}>
          {time}
        </Typography>
      </div>
    </Paper>
  );
};

export default CompanyBox;
