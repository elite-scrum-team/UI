import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation';
import EventItem from './components/EventItem';

const styles = {
    root: {
        padding: '0 10px',
        paddingTop: 24,
        maxWidth: 1300,
        margin: 'auto',
        
    },
    paper: {
        display: 'grid',

        gridTemplateColumns: '1fr 1fr',
    },
}

class Events extends Component {

    state = {
        isLoading: false,
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        {new Array(30).fill(0).map((v,i) => (
                            <EventItem key={i} imageLeft={(Math.floor((i)/2))%2 === 0} image='https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg'/>
                        ))}
                       
                    </Paper>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Events);