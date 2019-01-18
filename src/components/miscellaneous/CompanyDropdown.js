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
    dropdownStyle: {

    },
    selection: {
        color: '#fff',
        '&:before': {
            borderColor: '#fff',
        },

        '&:after': {
            borderColor: '#fff',
        }
    },
    dropArrow: {
        fill: '#fff',
    }

};

class CompanyDropdown extends Component {

    state={
        selected: {},
    };

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
        this.props.changeGroup(event.target.value);
    };

    componentDidMount() {
        this.setDefaultGroup(this.props.companies);
    }

    componentDidUpdate(prevProps) {
        if(this.props.companies && prevProps.companies !== this.props.companies) {
            this.setDefaultGroup(this.props.companies);
        }
    }

    setDefaultGroup = async (companies) => {
        const defaultGroup = companies.find(e => e.municipalitiyId !== null) || companies[0];
        await this.setState({selected: defaultGroup});
        console.log(this.state, defaultGroup);
    }

    render() {
        const {classes} = this.props;
        console.log("STATE: " , this.state.selected)
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <Select
                        className={classes.selection}
                        autoWidth={true}
                        value={this.state.selected}
                        name="company"

                        inputProps={{
                            classes: {
                                icon: classes.dropArrow,
                            },
                        }}
                        onChange={this.handleChange('selected')}
                    >
                        <MenuItem value="" disabled>
                            Grupper
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