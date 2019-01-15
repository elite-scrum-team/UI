import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';

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
        posted: null,
        status: 1,
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

        WarningService.getWarning(id, async (isError, e) => {
            if(isError === false) {
                await this.setState({
                    title : e.category.name,
                    posted: e.createdAt,
                    status: e.status ? e.status.type : 0,
                    statusMessage: e.status ? e.status.description : '',
                    description : e.description,
                    location: e.location,
                });
                this.setState({isLoading: false});

                await WarningService.getWarningItems(id)
                .then((data) => {
                    this.setState({items: data});
                });
            } else {
                this.props.history.push(URLS.home);
            }
            
        });

    }

    changeStatus = (newStatus) => {
        console.log(newStatus);
        const status = newStatus.status + 1;
   
        WarningService.createStatus(this.getWarningId(), status , newStatus.statusMsg)
        .then((data) => {
            this.addItem({
                type: 'statuses',
                data,
            });
            WarningService.getWarningItems(this.getWarningId())
            .then((data) => {
                this.setState({items: data, status: status});
            })
        });
    }

    addItem = (item) => {
        WarningService.addWarningItem(this.getWarningId(), item.type, item.data);
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                {this.state.isLoading ? null :
                <div className={classes.root}>
                    <Paper elevation={1}>
                        <WarningDetails
                            title={this.state.title}
                            date={this.state.posted}
                            status={this.state.status}
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
                                <ActionModule
                                    className={classes.actionMod}
                                    updateStatus={this.changeStatus}
                                />
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
                }
            </Navigation>
        )
    }
}

export default (withStyles(styles)(Details));
