import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Material UI components
import Sidebar from './components/Sidebar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { AutoComplete } from 'material-ui';

// Icons

// Project components
import WarningService from "../../api/services/WarningService";
import Navigation from '../../components/navigation/Navigation';
import DetailsDash from './components/DetailsDash';

const styles = {
  root: {
    marginTop: 48
  },
    sidebar: {
        '@media only screen and (max-width: 600px)': {
            width: '100%',
            marginTop: '48px',
        }
    },
}

class Dashboard extends Component {

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
        statusChange: 1,
        search: '',
        items: [
            {
                id: 1,
                status: 2,
                title: 'Hello',
                description: 'What is going on???',
                lat: 63.426114,
                lng: 10.404609
            },
            {
                id: 2,
                status: 0,
                title: 'Hello',
                description: 'What is going on???',
                lat: 63.426734,
                lng: 10.45609
            },
            {
                id: 3,
                status: 1,
                title: 'Hello',
                description: 'What is going on???',
                lat: 63.426734,
                lng: 10.45609
            },
            {
                id: 2,
                status: 3,
                title: 'Hello',
                description: 'What is going on???',
                lat: 63.426734,
                lng: 10.45609
            }
        ],

        showWarning: true,
    };

    getWarningId = () => this.props.match.params.warnID;

    componentDidMount() {
        // Get id
        const id = this.getWarningId();

        if (id === null) {
            this.setState({isLoading: false});
            return;
        }

        WarningService.getWarning(id, (isError, e) => {
            if (isError === false) {
                this.setState({
                    title: e.title,
                    warnDate: e.warnDate,
                    status: e.status ? e.status : 1,
                    province: e.province,
                    statusMessage: e.statusMessage,
                    description: e.description,
                    location: {
                        lat: e.lat,
                        lng: e.lng
                    },
                    images: e.images ? e.images : null,
                    items: e.items,
                });
            }
            this.setState({isLoading: false});
        });

        this.setState({id: id, isLoading: false});

        console.log(this.state.id);
    }

    what = () => console.log(this.state.id);

    render() {
        const {classes} = this.props;
        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <Hidden implementation='js' xsDown>
                        <Sidebar className={classes.sidebar}
                                 searchValue={this.state.search}
                                 items={this.state.items}
                                 onSubmit={this.onSearch}
                                 isLoading={this.state.isLoading}
                                 statusChange={this.state.statusChange}
                        />
                    </Hidden>
                    <Hidden implementation='js' xsDown={this.state.showWarning}>
                        <div className={classes.root}>
                            <DetailsDash state={this.state}/>
                        </div>
                    </Hidden>

                </div>
                <Hidden implementation='js' smUp>
                    <div>
                        <DetailsDash state={this.state}/>
                    </div>
                </Hidden>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Dashboard);
