import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';

// Material UI components
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";

// Icons

// Project components
import MessageDialog from '../miscellaneous/MessageDialog';
import statusLabels from '../../utils/warningUtils';
import EditCategoryList from './EditCategoryList';


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

class EditCategoryDialog extends Component{
    // State
    state = {
        dialogOpen: this.props.open,
    };

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    };

    handleEditCategory = () => {
        this.props.updateCategory();
        this.props.onClose();
    };

    cancel = () => {
        this.props.newCategoryClick(null);
        this.props.onClose();
        console.log(this.props.categories);
    };

    render() {
        // Styling
        const {classes, open} = this.props;

        return (
            <div className={classes.root}>
                <MessageDialog
                    title='Rediger kategori'
                    onClose={this.cancel}
                    actions={[
                        {label: 'Avbryt', action: this.cancel},
                        {label: 'Rediger', action: this.handleEditCategory, disabled: this.props.newCategory === null},
                    ]}
                    open={open}
                >
                    <EditCategoryList
                        categories={this.props.categories}
                        newCategoryClick={(category) => this.props.newCategoryClick(category)}
                        newCategory={this.props.newCategory}

                    />
                    <InputLabel htmlFor='status-simple'>Endre kategori hvis en annen kategori beskriver denne varselen bedre.</InputLabel>

                    <br/>
                </MessageDialog>
            </div>
        )
    }

}


export default withStyles(styles)(EditCategoryDialog);