import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Icons

// Project Components
import Navigation from '../../components/navigation/Navigation'
import Button from "@material-ui/core/es/Button/Button";
import MainDetail from "./components/mainDetail";
import DetailDescription from "./components/DetailDescription";


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
                    <MainDetail title='wahooo'
                                date='today' status='nu kjør vi' province='Bjørgvin fristat'
                                statusMessage='Vi hatj fiksa høle i vegen'/>
                    <DetailDescription description='Her erre hull i veien gutter'/>
                </div>
                </Navigation>
        )
    }
}

export default withStyles(styles)(Details);