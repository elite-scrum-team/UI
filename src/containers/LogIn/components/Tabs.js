import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// Material UI Components
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    border: "2px solid black",
    width: "100%"
  },
  button: {
    width: "50%",
    borderRadius: 0
  },
  rightBorder: {
    borderRight: "1px solid black"
  },
  leftBorder: {
    borderLeft: "1px solid black"
  },
  input: {
    display: "none"
  }
});

class Tabs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          className={classNames(classes.button, classes.rightBorder)}
          onClick={() => this.props.onChange(true)}
        >
          Logg inn
        </Button>
        <Button
          className={classNames(classes.button, classes.leftBorder)}
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
