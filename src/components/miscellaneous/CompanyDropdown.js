import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

//Service imports
import * as UserAction from '../../store/actions/UserAction';

// Material UI components
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";

// Icons

// Project components

const styles = {
    root: {

    },
    label: {
        color: "#fff"
    },
    formControl: {
        selectTextColor: "#fff"
    },

};

class CompanyDropdown extends Component {

    state={
        selected: "",
    };

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
        this.props.changeGroup(event.target.value);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <Select
                        autoWidth={true}
                        value={this.state.selected}
                        name="company"
                        displayEmpty
                        onChange={this.handleChange('selected')}
                    >
                        <MenuItem value="" disabled>
                            Selskaper
                        </MenuItem>
                        {this.props.companies.map(e =>
                            <MenuItem key={e.id} value={e}>
                                {e.name}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

const mapStoreToProps = (state) => ({
    companies: UserAction.getUserData(state).roles.groups,
});

export default connect(mapStoreToProps)(withStyles(styles)(CompanyDropdown));