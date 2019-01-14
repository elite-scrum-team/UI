import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

// Service import
import WarningService from "../../api/services/WarningService";

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
    },
    actionMod:{
        padding:0,
        display: 'inline',
        height: 'auto'
    }
}

class Details extends Component {

    state = {
        isLoading: false,

        id: null,
        title: null,
        warnDate: null,
        status: 1,
        province: null,
        statusMessage: null,
        description: null,
        location: {
            lat: 0,
            lng: 0,
        },
        images: null,

        items: [],
    };

    getWarningId = () => this.props.match.params.id;

    componentDidMount() {
        // Get id
        const id = this.getWarningId();

        console.log(id);

        this.setState({id: id, isLoading: true});

        this.setState({isLoading: true});

        WarningService.getWarning(id, (isError, e) => {
            if(isError === false) {
                this.setState({
                    title : e.title,
                    warnDate: e.warnDate,
                    status: e.status ? e.status : 1,
                    province: e.province,
                    statusMessage: e.statusMessage,
                    description : e.description,
                    location : {
                        lat: e.lat,
                        lng: e.lng
                    },
                    images : e.images ? e.images : null,
                    items : e.items,
                });
            }
            this.setState({isLoading: false});
        });

    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <Paper elevation={1}>
                        <WarningDetails
                            title={this.state.title}
                            date={this.state.warnDate}
                            status={this.state.status}
                            province={this.state.province}
                            statusMessage={this.state.statusMessage}
                            description={this.state.description}
                            location={this.state.location}
                            />
                        <Divider />
                        <ImageGrid
                            images={this.state.images}
                            />
                    </Paper>
                    <div className={classes.content}>
                        <div>
                            <Paper elevation={1} className='p-30'>
                                <ActionModule className={classes.actionMod} />
                            </Paper>
                        </div>
                        <div>
                            <FeedModule
                                id={this.state.id}
                                items={this.state.items}
                            />
                        </div>
                    </div>
                </div>
                </Navigation>
        )
    }
}

export default withStyles(styles)(Details);
