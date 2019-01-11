import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

// Icons

// Project components
import Navigation from '../../components/navigation/Navigation'
import WarningDetails from "./components/WarningDetails";
import ImageGrid from './components/ImageGrid';
import ActionModule from './components/ActionModule';
import FeedModule from './components/FeedModule';

const styles = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 16,
        paddingBottom: 100,
    },
    content: {
        display: 'grid',
        
        gridTemplateColumns: '1fr 3fr',
        gridGap: '14px',

        marginTop: 14,
        
        '@media only screen and (max-width: 1000px)': {
            padding: '0 4px',
        },
        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
        }
    }
}

class Details extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <Paper elevation={1}>
                        <WarningDetails 
                            title='Hull i vei'
                            date='2019-01-09T21:39:59+01:00'
                            status={3}
                            province='Trondheim Kommune'
                            statusMessage='Vi har begynt å fikse veien, og dette blir tatt hånd om så kjapt som mulig.'
                            description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.'
                            location={{lat: 63.429748, lng: 10.393916}}
                            />
                        <Divider />
                        <ImageGrid
                            images={[
                                'https://wtop.com/wp-content/uploads/2018/02/1pothole-727x485.jpg',
                                'https://wtop.com/wp-content/uploads/2018/02/1pothole-727x485.jpg',
                                'https://wtop.com/wp-content/uploads/2018/02/1pothole-727x485.jpg',
                            ]}
                            />
                    </Paper>
                    <div className={classes.content}>
                        <Paper elevation={1} className='p-30'>
                           <ActionModule />
                        </Paper>
                        <div>
                            <FeedModule
                                province='Trondheim Kommune'
                                status={3}
                                date='2019-01-09T21:39:59+01:00'
                                statustekst='Work in Progress'
                                statusMessage='Har sagt i fra til bedrift bla bla bla'
                            />
                        </div>
                    </div>
                </div>
                </Navigation>
        )
    }
}

export default withStyles(styles)(Details);