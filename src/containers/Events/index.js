import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';

const styles = {
    root: {

    }
}

class Events extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Navigation >

            </Navigation>
        )
    }
}

export default withStyles(styles)(Events);