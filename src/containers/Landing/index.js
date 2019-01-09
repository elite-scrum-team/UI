import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import Button from '@material-ui/core/Button';

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation';
import Map from '../../components/miscellaneous/Map';

const styles = {
    
}

class Landing extends Component {

    render() {
        return (
            <Navigation>
                <Map />
            </Navigation>
        )
    }
}

export default withStyles(styles)(Landing);