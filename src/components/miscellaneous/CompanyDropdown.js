import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

//Service imports
import * as UserAction from '../../store/actions/UserAction';

// Material UI components
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';

// Icons

// Project components

const styles = {
    label: {
        color: "#fff",
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
    },
    toFront: {
        zIndex: 30000,
    }
};

class CompanyDropdown extends Component {

    handleChange = (name) => (event) => {
        if(this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <Select
                        className={classes.selection}
                        autoWidth={true}
                        value={this.props.selectedGroup}
                        inputProps={{
                            classes: {
                                icon: classes.dropArrow,
                                selectMenu: classes.toFront,
                                select: classes.toFront,
                            },
                        }}
                        onChange={this.handleChange('selected')}
                    >
                        <div className='p-10'>
                            <Typography variant='body2'>Mine grupper</Typography>
                        </div>
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
    selectedGroup: UserAction.getCurrentGroup(state) || {},
});

export default connect(mapStoreToProps)(withStyles(styles)(CompanyDropdown));