import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

function Change(props) {
    const { classes } = props;
    const [password, setPassword] = useState("");
    const [confirm, SetConfirm] = useState("");

    return (
        <div>
            <form
                className={classes.form}
                onSubmit={props.pass(password, confirm)}
            >
                <FormLabel>Endring av passord</FormLabel>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Nytt passord</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="confirm">Gjenta nytt passord</InputLabel>
                    <Input
                        id="confirm"
                        name="confirm"
                        value={confirm}
                        onChange={e => SetConfirm(e.target.value)}
                        type='password'
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
                    Endre passord
                </Button>
            </form>
        </div>
    );
}

Change.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Change);
