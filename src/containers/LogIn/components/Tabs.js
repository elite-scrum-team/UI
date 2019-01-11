import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// Material UI components
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    border: "2px solid ".concat(theme.palette.primary.main),
    width: "100%"
  },
  button: {
    width: "50%",
    borderRadius: 0
  },
  rightBorder: {
    borderRight: "1px solid ".concat(theme.palette.primary.main)
  },
  leftBorder: {
    borderLeft: "1px solid ".concat(theme.palette.primary.main)
  },
  input: {
    display: "none"
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  }
});

class Tabs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          className={classNames(classes.button, classes.rightBorder, this.props.isSignIn ? classes.primary : '')}
          onClick={() => this.props.onChange(true)}
        >
          Logg inn
        </Button>
        <Button
          className={classNames(classes.button, classes.leftBorder, !this.props.isSignIn ? classes.primary : '')}
          onClick={() => this.props.onChange(false)}
        >
          Registrer deg
        </Button>
      </div>
    );
  }
}
Tabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tabs);
