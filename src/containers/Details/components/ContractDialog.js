import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Select from 'react-select'

// Material UI components

// Icons

// Project components
import SearchableDropdown from "../../../components/miscellaneous/SearchableDropdown"
import MessageDialog from '../../../components/miscellaneous/MessageDialog';



const styles = {
    root: {

    },
    dropdown:{
        height: 500,
    },
    msgDia:{
        height: 500
    }
};

class ContractDialog extends Component {
    state = {
        companyId: '',
        description: '',
    };

    handleNewContract = (value) => {
        this.props.submitContract(value);
    };

    cancel = () => {
        this.props.cancel();
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <MessageDialog
                    className={classes.msgDia}
                    title='Etabler kontrakt'
                    actions={[
                        {label: 'Send', action: this.handleNewContract},
                        {label: 'Avbryt', action: this.cancel}
                    ]}
                    open={this.props.open}
                >
                    <SearchableDropdown
                        className={classes.dropdown}
                        options={[
                            {label: 'Stein&Sprøyt AS', value: 'Stein&Sprøyt AS'},
                            {label: 'Påls Asfalt', value: 'Påls Asfalt'},
                            {label: 'Pers Asfalt', value: 'Pers Asfalt'}
                        ]}
                    />
                </MessageDialog>
            </div>
        )
    }
}

export default withStyles(styles)(ContractDialog);