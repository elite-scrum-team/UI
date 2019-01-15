import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import SearchableDropdown from "../../../components/miscellaneous/SearchableDropdown"
import MessageDialog from '../../../components/miscellaneous/MessageDialog';



const styles = {
    root: {

    },
    content: {
        minHeight: 100,
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
                    </div>
                </MessageDialog>
            </div>
        )
    }
}

export default withStyles(styles)(ContractDialog);