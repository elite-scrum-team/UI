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

const ConfirmEditDialog = (props) => {

    // Styling
    const classes = styles();

    return (
        <MessageDialog
            open={props.open}
            onClose={props.closeConfirmDialogCallback}
            title={!props.isLoading ? 'Vil du redigere dette arrangementet?' : 'Redigerer...'}
            actions={[
                {label: 'Rediger', action: props.onSubmit},
                {label: 'Avbryt', action: props.closeConfirmDialogCallback}
            ]}
        >
            {!props.isLoading ?
                <DialogContentText id="alert-dialog-description">
                    Når du redigerer denne saken vil de i kommunen hvor det foregår kunne se de nye endringene.
                </DialogContentText>
                :
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
            }
        </MessageDialog>
    )
}

export default (ConfirmEditDialog);