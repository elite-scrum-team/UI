import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/styles';
import { useState } from 'react';

// Material UI components
import TextField from '@material-ui/core/TextField';

// Icons

// Project components
import MessageDialog from '../../../components/miscellaneous/MessageDialog';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const styles = {
    root: {

    }
};

class StatusDialog extends Component{
    // State
    state = {
        dialogOpen: false,
        newStatus: -1,
        statusMsg: '',
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    handleNewStatus = () =>{

    };

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <MessageDialog
                    title='Sett ny status:'
                    actions={[{label: 'Send', action: ()=> this.handleNewStatus()}]}
                    open={this.props.open}
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="status-simple">Status:</InputLabel>
                        <Select
                            value={this.state.newStatus}
                            onChange={this.handleChange('newStatus')}
                            inputProps={{
                                name: 'Status',
                                id: 'status-simple',
                            }}
                        >
                            <MenuItem value={0}>Ikke godkjent</MenuItem>
                            <MenuItem value={1}>Godkjent</MenuItem>
                            <MenuItem value={2}>Arbeid påbegynt</MenuItem>
                            <MenuItem value={3}>Ferdig</MenuItem>
                            <MenuItem value={4}>Avslått</MenuItem>

                        </Select>
                    </FormControl>
                    <br/>
                    <TextField
                        id="filled-email-input"
                        label="Statusmelding"
                        className={classes.textField}
                        type="StatusMessage"
                        name="StatusMessage"
                        autoComplete="statusMsg"
                        margin="normal"
                        onChange={this.handleChange('statusMsg')}
                    />
                </MessageDialog>
            </div>
        )
    }

}


export default withStyles(styles)(StatusDialog);