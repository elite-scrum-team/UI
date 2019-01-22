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

class Statistics extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <h4>Statistics page! :D</h4>
                    <h4>Go Halvor!</h4>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Statistics);