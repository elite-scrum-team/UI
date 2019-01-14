import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import {Typography} from "@material-ui/core";

// Material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Icons

// Project components
import ChangeStatus from './ChangeStatus';

const styles = makeStyles({
    root: {
        
    }
});

const ActionModule = (props) => {
    // State
    const [dialogOpen, setDialogOpen] = useState(false);


    const openDialog = () => {
        setDialogOpen(true)
    };

    const closeDialog = () => {
        setDialogOpen(false)
    }



    // Styling
    const classes = styles();

    return (
        <div className={classes.root}>
            <div>
                <Typography variant={"h6"}>
                    Actions:
                </Typography>
                <List component="nav" className={classes.root}>
                    <ListItem button>
                        <ListItemText primary="Varsle meg ved endringer" />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                        <ListItemText primary="Registrer kontrakt" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Ny status" />
                    </ListItem>
                    <Divider light />
                    <ChangeStatus open={dialogOpen} closeDialogCallback={() => closeDialog()}/>
                </List>
            </div>
        </div>
    )
}

ActionModule.propTypes = {
    
}

export default (ActionModule);