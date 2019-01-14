import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";

// Material UI components

// Icons

// Project components

const styles = makeStyles({
    root: {

    }
});

const ChangeStatus = (props) => {
    // State
    const [open, setData] = useState({});
    const emails = ['username@gmail.com', 'user02@gmail.com'];

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <Dialog open={props.open} onClose={props.closeDialogCallback}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <div>
                    <List>
                        {emails.map(email => (
                            <ListItem button onClick={() => props.closeDialogCallback()} key={email}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        {/*<PersonIcon />*/}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => props.closeDialogCallback()}>
                            <ListItemAvatar>
                                <Avatar>
                                    {/*<AddIcon />*/}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="add account" />
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        </div>
    )
}

export default (ChangeStatus);