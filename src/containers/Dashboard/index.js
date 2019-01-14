import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Navigation from "../../components/navigation/Navigation";

// Material UI components
import Sidebar from './components/Sidebar';

// Icons

// Project components

const styles = {
    root: {}
}

class Dashboard extends Component {

    state = {
        isLoading: true,
    };

        render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <Sidebar>

                    </Sidebar>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Dashboard);