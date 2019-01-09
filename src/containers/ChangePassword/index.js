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
    },
    card: {
        gridColumnStart:2,
        gridColumnEnd:3,
        gridRowStart:2,
        gridRowEnd:3,
    }
};

class ChangePassword extends Component {
    constructor(props){
        super(props);

        this.state={
            email: ''
        }
    }

    componentDidMount(){
        //comp did mount!
    }

    render() {
        const { classes } = this.props;
        const { email } = this.state;

        return (
            <Navigation>
                <div className={classes.root}>
                    <div className={classes.wrapper}>

                        <Recover className={classes.card} data={{
                            email : email
                        }}/>

                    </div>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(ChangePassword);


ChangePassword.propTypes={

};
