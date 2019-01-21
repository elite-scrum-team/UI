import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class SubscribeDialog extends React.Component {
    state = {
        open: this.props.open,
        subscribed: this.props.subscribed,
    };

    handleSub = () => {
        this.props.submitSubscribe(!this.props.subscribed);
        this.props.onClose();
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.subscribed ? "Vil du slutte å følge dette varslet?" : "Vil du følge dette varslet?"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Avbryt
                        </Button>
                        <Button onClick={this.handleSub} color="primary" autoFocus>
                            {this.props.subscribed ? "Ikke følg" : "Følg"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default SubscribeDialog;