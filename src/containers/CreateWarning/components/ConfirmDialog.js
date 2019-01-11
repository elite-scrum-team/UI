import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";


// Icons

// Project components

const styles = makeStyles({
    root: {

    }
});

const ConfirmDialog = (props) => {
    // State
    const [open, setData] = useState(false);

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Dialog
                onClose={() => props.closeConfirmDialogCallback()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={props.open}
            >
                <DialogTitle id="alert-dialog-title">Vil du registrere denne varselen?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Når du registrerer denne varselen vil den bli sendt inn til kommunen, som må godkjenne den før den publiseres.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.closeConfirmDialogCallback()} color="primary">
                        Send inn
                    </Button>
                    <Button onClick={() => props.closeConfirmDialogCallback()} color="primary" autoFocus>
                        Avbryt
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default (ConfirmDialog);