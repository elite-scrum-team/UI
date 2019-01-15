import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
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
import MessageDialog from '../../../components/miscellaneous/MessageDialog';
import {PropTypes} from "@material-ui/core";

const styles = makeStyles({
    root: {

    }
});

const ChangeStatus = (props) => {
    // State
    const [open, setData] = useState({});

    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <MessageDialog>

            </MessageDialog>
        </div>
    )
}

ChangeStatus.propTypes = {
    open: PropTypes.bool,
}

export default (ChangeStatus);