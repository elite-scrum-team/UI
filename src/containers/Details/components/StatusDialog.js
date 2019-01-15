import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Icons

// Project components
import MessageDialog from '../../../components/miscellaneous/MessageDialog';
import statusLabels from '../../../utils/warningUtils'


const styles = {
    root: {},
    textField: {
        width: 500,

        '@media only screen and (max-width: 800px)': {
            width: 300
        }
    },
    formControl:{
        width: 200,
    },
    item: {
        position: 'relative',
    },
    sidebar: {
        position: 'absolute',
        top: 8,
        bottom: 8,
        right: 4,
        height: 8,
        width: 8,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    acknowledged: {
       backgroundColor: 'var(--inactive)',
    },
    progress: {
        backgroundColor: 'var(--progress)',
    },
    done: {
        backgroundColor: 'var(--done)',
    },
    rejected: {
        backgroundColor: 'var(--rejected)',
    },
};

class StatusDialog extends Component{
    // State
    state = {
        dialogOpen: this.props.open,
        newStatus: -1,
        statusMsg: '',
        statusNames: statusLabels
    };


    handleChange = (name) => (event) => {
        console.log("Value: ", event.target.value);
        this.setState({[name]: event.target.value});
    };

    handleNewStatus = () =>{
        this.setState({dialogOpen: false});
        this.props.submitStatus({status: this.state.newStatus, statusMsg: this.state.statusMsg});
    };

    cancel = () => {
        this.props.cancel();
    };

    render() {
        // Styling
        const {classes, open} = this.props;
        const statusStyles = [classes.acknowledged, classes.progress, classes.done, classes.rejected];

        return (
            <div className={classes.root}>
                <MessageDialog
                    title='Sett ny status:'
                    onClose={this.props.onClose}
                    actions={[
                        {label: 'Lukk', action: this.props.onClose},
                        {label: 'Send', action: this.handleNewStatus},
                    ]}
                    open={open}
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="status-simple">Status:</InputLabel>
                        <Select
                            native
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
                                        <MenuItem className={classes.item} key={index} value={index}>
                                            <div className={classNames(classes.sidebar, statusStyles[index])} />
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