import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons

// Project components
import MessageDialog from '../../../components/miscellaneous/MessageDialog';

const styles = makeStyles({
    loading: {
        minHeight: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        minWidth: 230,
    }
});

const ConfirmDialog = (props) => {

    // Styling
    const classes = styles();

    const reg = [
        {label: 'Send inn', action: props.onSubmit},
        {label: 'Avbryt', action: props.closeConfirmDialogCallback}
    ];

    const load = [{label: ""}];

    return (
        <MessageDialog
            open={props.open}
            onClose={props.closeConfirmDialogCallback}
            title={!props.isLoading ? 'Vil du registrere denne saken?' : 'Laster opp saken...'}
            actions={!props.isLoading ? reg : load}
        >
            {!props.isLoading ?
                <DialogContentText id="alert-dialog-description">
                    Når du registrerer denne saken vil de i kommunen hvor det foregår kunne se den.
                </DialogContentText>
                :
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            }
        </MessageDialog>
    )
}

export default (ConfirmDialog);