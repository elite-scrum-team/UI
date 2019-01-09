import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation'
import Button from "@material-ui/core/es/Button/Button";
import MainDetail from "./components/mainDetail";


const styles = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 16,
    }
}

class Details extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <MainDetail title='wahooo' description='Her erre hull i veien gutter' date='today' status='nu kjør vi' province='Bjørgvin fristat'/>
                </div>
                </Navigation>
        )
    }
}

export default withStyles(styles)(Details);