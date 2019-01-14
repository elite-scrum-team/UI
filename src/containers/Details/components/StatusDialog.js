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
import statusLabels from '../../../utils/warningUtils'


const styles = {
    root: {

    },
    textField: {
        width: 500,

        '@media only screen and (max-width: 800px)': {
            width: 300
        }
    },
    formControl:{
        width: 200,

    }
};

class StatusDialog extends Component{
    // State
    state = {
        dialogOpen: this.props.open,
        newStatus: -1,
        statusMsg: '',
        statusNames: statusLabels
    }


    handleChange = (name) => (event) => {
        console.log("Value: ", event.target.value);
        this.setState({[name]: event.target.value});
    };

    handleNewStatus = () =>{
        this.setState({dialogOpen: false});
        this.props.submitStatus({status: this.state.newStatus, statusMsg: this.state.statusMsg});
    };

    render() {
        // Styling
        const {classes, open} = this.props;

        return (
            <div className={classes.root}>
                <MessageDialog
                    title='Sett ny status:'
                    actions={[{label: 'Send', action: this.handleNewStatus}]}
                    open={open}
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
                            {
                                this.state.statusNames.statusLabels.map((item, index)=>{
                                    return(
                                        <MenuItem key={index} value={index}>
                                            {item}
                                        </MenuItem>
                                    )})
                            }

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