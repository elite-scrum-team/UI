import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import Button from '@material-ui/core/Button';

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation';
import Recover from '../../components/Recover'

const styles = {
    root: {

    },
    wrapper:{
        display: 'grid',
        gridTemplateColumns: '20% auto 20%',
        gridTemplateRows: '20% auto 20%',
    },
    card: {
        gridColumnStart:2,
        gridColumnEnd:3,
        gridRowStart:2,
        gridRowEnd:3,
    }
};

class ChangePassword extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <Recover className={classes.card}/>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(ChangePassword);


ChangePassword.propTypes={

};
