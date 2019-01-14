import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import {Typography} from "@material-ui/core";

// Material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


// Icons

// Project components
import StatusDialog from './StatusDialog'

const styles = {
    root: {
        
    }
};

class ActionModule extends Component {
    state = {
        dialogOpen: false,
        newStatus: -1,
        statusMsg: '',
    }

    handleNewStatus = async (value) => {
        await this.setState({newStatus: value});
        console.log(value);
        console.log("NewStatus: " + this.state.newStatus + ' ' + this.state.statusMsg);
        this.setState({dialogOpen: (false)});
    };

    render() {


        // Styling
        const {classes} = this.props;



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
                        <ListItem button onClick={() => this.setState({dialogOpen: true})}>
                            <ListItemText primary="Ny status" />
                        </ListItem>
                        <Divider light />
                    </List>
                </div>
                <StatusDialog
                    open={this.state.dialogOpen}
                />
            </div>
        )
    }
}

ActionModule.propTypes = {

}

export default withStyles(styles)(ActionModule);