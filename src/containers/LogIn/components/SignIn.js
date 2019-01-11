import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 12,
  },
});

function SignIn(props) {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form className={classes.form} onSubmit={props.logIn(email, password)}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            autoFocus
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Passord</InputLabel>
          <Input
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
            autoComplete="current-password"
          />
          <FormHelperText error={props.errorMessasge !== null}>
            {props.errorMessage}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Logg inn
        </Button>
        <div className={classes.linkWrapper}>
          <Link
            to="/recover"
            style={{ color: "#007c91" }}
          >
            Glemt passord?
          </Link>
        </div>
      </form>
    </div>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
