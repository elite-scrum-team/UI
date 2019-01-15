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
    root: {},
    sidebar: {
        '@media only screen and (max-width: 600px)': {
            width: '100%',
        }
    },
}

class Dashboard extends Component {

    state = {
        isLoading: true,

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
                        />
                    </Hidden>
                    <Hidden implementation='js' xsDown={this.state.showWarning}>
                        <div className={classes.root}>
                            <DetailsDash state={this.state}/>
                        </div>
                    </Hidden>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Dashboard);