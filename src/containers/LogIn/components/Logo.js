import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// Icons
import LogoImage from "../../../assets/img/logo.png";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    cursor: 'pointer',
  },
  img: { width: "100%", height: "auto", objectFit: "cover" }
});

class Logo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} onClick={this.props.onClick}>
        <img className={classes.img} src={LogoImage} alt="logo" />
      </div>
    );
  }
}
Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);
