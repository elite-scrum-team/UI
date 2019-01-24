import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = makeStyles({
  root: {
    margin: '4px 0',
  },
  bar: {
    height: 4,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    width: '50%',
  },
});

const goodLength = 16;
const mediumLength = 8;

const getFillerWidth = passwordLength => {
  const precentage = (passwordLength / (goodLength + 5)) * 100;
  return precentage > 100 ? 100 : precentage;
};

const getPasswordStatus = password => {
  return password.length >= goodLength
    ? 'Sterkt'
    : password.length >= mediumLength
      ? 'Medium sterkt'
      : 'Svakt';
};

const passwordColor = password => {
  return password.length >= goodLength
    ? 'var(--pv-green)'
    : password.length >= mediumLength
      ? 'var(--pv-yellow)'
      : 'var(--pv-red)';
};

const passwordValidator = props => {
  const classes = styles();
  const password = props.password ? props.password : '';

  return (
    <Grid className={classes.root} container direction="column" wrap="nowrap">
      <Typography variant="caption">{getPasswordStatus(password)}</Typography>
      <div className={classes.bar}>
        <div
          className={classes.fill}
          style={{
            width: getFillerWidth(password.length) + '%',
            backgroundColor: passwordColor(password),
          }}
        />
      </div>
    </Grid>
  );
};

passwordValidator.propTypes = {
  password: PropTypes.string,
};

export default (passwordValidator);