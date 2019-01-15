import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import MessageDialog from '../../../components/miscellaneous/MessageDialog';



const styles = {
    root: {

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
                    title='Etabler kontrakt'
                    actions={[{label: 'Send', action: this.handleNewContract},
                        {label: 'Avbryt', action: this.cancel}
                    ]}
                    open={this.props.open}
                >

                </MessageDialog>
            </div>
        )
    }
}

export default withStyles(styles)(ContractDialog);