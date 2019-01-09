import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation'
import Button from "@material-ui/core/es/Button/Button";


const styles = {

}

class Details extends Component {

    render() {
        return (
            <Navigation>
                hello
                <label defaultValue={'aa'+this.props.params.warnID}></label>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Details);