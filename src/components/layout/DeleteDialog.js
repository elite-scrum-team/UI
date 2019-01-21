import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';

// Material UI components
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";

// Icons

// Project components
import MessageDialog from '../miscellaneous/MessageDialog';
import statusLabels from '../../utils/warningUtils'


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
        newStatus: 4,
        statusMsg: '',
        statusNames: statusLabels
    };


    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    handleNewStatus = () =>{
        this.setState({dialogOpen: false});
        this.props.onClose();
        this.props.submitStatus({status: this.state.newStatus, statusMsg: this.state.statusMsg});
    };

    cancel = () => {
        this.setState({
            newStatus: -1,
            statusMsg: '',
        });
        this.props.onClose();
    };

    render() {
        // Styling
        const {classes, open} = this.props;

        return (
            <div className={classes.root}>
                <MessageDialog
                    title='Slett varsling'
                    onClose={this.cancel}
                    actions={[
                        {label: 'Avbryt', action: this.cancel},
                        {label: 'Slett', action: this.handleNewStatus, disabled: this.state.newStatus === -1},
                    ]}
                    open={open}
                >
                    {/*<FormControl className={classes.formControl}>*/}
                        <InputLabel htmlFor="status-simple">Hvis du velger å slette varslingen vil den ikke fjernes fra databasen, men gjort usynlig for vanlige brukere.</InputLabel>
                        {/*<Select*/}
                            {/*value={this.state.newStatus}*/}
                            {/*onChange={this.handleChange('newStatus')}*/}
                            {/*inputProps={{*/}
                                {/*name: 'Status',*/}
                                {/*id: 'status-simple',*/}
                            {/*}}*/}
                        {/*>*/}
                            {/*{*/}
                                {/*this.state.statusNames.statusLabels.map((item, index)=>{*/}
                                    {/*return(*/}
                                        {/*<MenuItem className={classes.item} key={index} value={index}>*/}
                                            {/*<div className={classNames(classes.sidebar, statusStyles[index])} />*/}
                                            {/*{item}*/}
                                        {/*</MenuItem>*/}
                                    {/*)})*/}
                            {/*}*/}

                        {/*</Select>*/}
                    {/*</FormControl>*/}
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