import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import SearchableDropdown from "../../../components/miscellaneous/SearchableDropdown"
import MessageDialog from '../../../components/miscellaneous/MessageDialog';
import TextField from "@material-ui/core/TextField";



const styles = {
    root: {

    },
    content: {
        minHeight: 100,
    },
    textField: {
        width: 500,

        '@media only screen and (max-width: 800px)': {
            width: 300
        }
    },
};

class ContractDialog extends Component {
    state = {
        companyId: '',
        contractMsg: '',
    };

    handleNewContract = () => {
        this.props.submitContract(this.state);
    };

    handleChange = (name) => (event) => {
        console.log("Value: ", event.target.value);
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <MessageDialog
                    className={classes.msgDia}
                    title='Etabler kontrakt'
                    actions={[
                        {label: 'Avbryt', action: this.props.onClose},
                        {label: 'Send', action: this.handleNewContract},
                    ]}
                    open={this.props.open}
                >
                    <div className={classes.content}>
                        <SearchableDropdown
                            className={classes.dropdown}
                            options={[
                                {label: 'Stein&Sprøyt AS', value: 'Stein&Sprøyt AS'},
                                {label: 'Påls Asfalt', value: 'Påls Asfalt'},
                                {label: 'Pers Asfalt', value: 'Pers Asfalt'},
                                {label: 'Stein&Sprøyt AS', value: 'Stein&Sprøyt AS'},
                                {label: 'Påls Asfalt', value: 'Påls Asfalt'},
                                {label: 'Pers Asfalt', value: 'Pers Asfalt'},
                                {label: 'Stein&Sprøyt AS', value: 'Stein&Sprøyt AS'},
                                {label: 'Påls Asfalt', value: 'Påls Asfalt'},
                                {label: 'Pers Asfalt', value: 'Pers Asfalt'},
                                {label: 'Stein&Sprøyt AS', value: 'Stein&Sprøyt AS'},
                                {label: 'Påls Asfalt', value: 'Påls Asfalt'},
                                {label: 'Pers Asfalt', value: 'Pers Asfalt'}
                            ]}
                        />
                        <TextField
                            id="filled-email-input"
                            label="Kontraktmelding"
                            className={classes.textField}
                            type="ContractMessage"
                            name="ContractMessage"
                            autoComplete="contractMsg"
                            margin="normal"
                            onChange={this.handleChange('contractMsg')}
                        />
                    </div>
                </MessageDialog>
            </div>
        )
    }
}

export default withStyles(styles)(ContractDialog);