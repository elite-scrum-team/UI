import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from "../../URLS";

// Material UI components

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import Recover from './components/Recover'

const styles = {
    root:{
        height: '100vh',
        width:'100%',
        margin:0
    }
    ,
    wrapper:{
        display: 'grid',
        gridTemplateColumns: '20% auto 20%',
        gridTemplateRows: '40% auto 20%',
        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '100%',
            justifyItems:'center',
            padding:'5px'
        },
        padding: 20,
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
                        <Recover className={classes.card} goToLogin={() => this.props.history.push(URLS.login)}/>
                    </div>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(ChangePassword);


ChangePassword.propTypes={

};
