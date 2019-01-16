import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI components
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    border: '2px solid '.concat(theme.palette.primary.main),
    width: '100%'
  },
  button: {
    width: '33.1%',
    borderRadius: 0
  },
  rightBorder: {
    borderRight: '1px solid '.concat(theme.palette.primary.main)
  },
  rightBorder2: {
    borderRight: '2px solid '.concat(theme.palette.primary.main)
  },
  leftBorder: {
    borderLeft: '1px solid '.concat(theme.palette.primary.main)
  },
  input: {
    display: 'none'
  },
  primary: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white'
  }
});

class StatusTabs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          size='small'
          className={classNames(
            classes.button,
            classes.rightBorder,
            this.props.value === 0 ? classes.primary : ''
          )}
          onClick={() => this.props.onChange(0)}
        >
          Nytt
        </Button>
        <Button
          size='small'
          className={classNames(
            classes.button,
            classes.leftBorder,
            classes.rightBorder,
            this.props.value === 1 ? classes.primary : ''
          )}
          onClick={() => this.props.onChange(1)}
        >
          Behandlet
        </Button>
        <Button
          size='small'
          className={classNames(
            classes.button,
            classes.leftBorder,
            classes.rightBorder2,
            this.props.value === 2 ? classes.primary : ''
          )}
          onClick={() => this.props.onChange(2)}
        >
          Utført
        </Button>
      </div>
    );
  }
}
StatusTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StatusTabs);
