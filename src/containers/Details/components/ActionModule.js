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
import MessageDialog from '../../../components/miscellaneous/MessageDialog';

const styles = makeStyles({
    root: {
        
    }
});

const ActionModule = (props) => {
    // State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState(null);

    // Styling
    const classes = styles();

    const handleNewStatus = (value) => {
        console.log(value);
        setDialogOpen(false);
    };

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
                    <ListItem button onClick={() => setDialogOpen(true)}>
                        <ListItemText primary="Ny status" />
                    </ListItem>
                    <Divider light />
                </List>
            </div>
            <MessageDialog
                title='Sett ny status:'
                actions={[
                    {label: 'Ikke godjkent', action: ()=>{handleNewStatus(0)}},
                    {label: 'Godkjent', action: ()=>{handleNewStatus(1)}},
                    {label: 'Arbeid påbegynt', action: ()=>{handleNewStatus(2)}},
                    {label: 'Ferdig', action: ()=>{handleNewStatus(3)}},
                    {label: 'Deaktivert', action: ()=>{handleNewStatus(4)}}
                ]}
                open={dialogOpen}
            >

            </MessageDialog>
        </div>
    )
}

ActionModule.propTypes = {
    
}

export default (ActionModule);