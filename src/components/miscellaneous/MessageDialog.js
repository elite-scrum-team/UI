import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// Material UI components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Icons
import WarningIcon from '@material-ui/icons/Warning';


// Project components

const styles = makeStyles({
    root: {
        
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        margin: 12,
    },
    mr: {
        marginRight: 10,
    }
});

const MessageDialog = (props) => {

    // Styling
    const classes = styles();

    const actions = props.actions || [];

    if(actions.length === 0) {
        actions.push({
            label: 'Ok',
            action: props.onClose,
            color: 'primary',
        });
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                classes: {
                    root: classes.paper,
                },
            }}
        >
            <DialogTitle disableTypography={true}>
                <Typography variant='h5' color={props.error ? 'error' : 'default'}>
                    <div className={classes.flex}>
                    {props.error && <WarningIcon className={classes.mr} />}{props.title}
                    </div>
                </Typography>
            </DialogTitle>
            <DialogContent>
                {props.content &&
                    <DialogContentText>
                        {props.content}
                    </DialogContentText>
                }
                {props.children}
            </DialogContent>
            <DialogActions>
                {actions.map((action) => (
                    <Button key={action.label} onClick={action.action} color={action.color || 'primary'} disabled={action.disabled}>
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

MessageDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    actions: PropTypes.array,

    error: PropTypes.bool,
}

MessageDialog.defaultProps = {
    open: false,
}

export default (MessageDialog);