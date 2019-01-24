import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI Components
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

function Register(props) {
  const { classes } = props;
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, SetConfirm] = useState("");

  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        onSubmit={props.reg(email, '', '')}
      >
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
        </FormControl>
        <Typography variant='caption' align='center'>Passord vil bli sendt på email.</Typography>
        <FormControl margin="normal" required fullWidth>
          {/* <InputLabel htmlFor="password">Passord</InputLabel>
          <Input
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="confirm">Gjenta passord</InputLabel>
          <Input
            id="confirm"
            name="confirm"
            value={confirm}
            onChange={e => SetConfirm(e.target.value)}
            type='password'
          /> */}
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
          Register
        </Button>
      </form>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
