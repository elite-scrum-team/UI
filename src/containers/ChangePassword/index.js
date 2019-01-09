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
    root:{
        height: '100vh',
        width:'100%',
        margin:0
    }
    ,
    wrapper:{
        display: 'grid',
        gridTemplateColumns: '33% auto 33%',
        gridTemplateRows: '40% auto 20%',
        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '100%',
            justifyItems:'center',
            padding:'5px'
        },
    },
    card: {
        gridColumnStart:2,
        gridColumnEnd:3,
        gridRowStart:2,
        gridRowEnd:3,
        '@media only screen and (max-width: 600px)': {
            gridColumnStart:1,
            gridColumnEnd:2,
            gridRowStart:2,
            gridRowEnd:3,
        },
    }
};

class ChangePassword extends Component {

    componentDidMount(){
        //comp did mount!
    }

    render() {
        const { classes } = this.props;

        return (
            <Navigation>
                <div className={classes.root}>
                    <div className={classes.wrapper}>
                        <Recover className={classes.card}/>
                    </div>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(ChangePassword);


ChangePassword.propTypes={

};
