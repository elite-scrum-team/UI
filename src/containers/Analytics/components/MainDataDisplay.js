import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Material UI components

// Icons

// Project components
import BarChartView from './chartViews/BarChartView';
import LineChartView from './chartViews/LineChartView';

const styles = {
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        gridGap: '14px',

        '@media only screen and (max-width: 1100px)': {
            gridTemplateColumns: '1fr 1fr 1fr',
        }
    },
    grow: {
        gridColumn: 'span 3',
    },
};

class MainDataDisplay extends Component {

    state = {
        isLoading: false,
    }

    reloadData(time) {
        // Set isLoading true,
        this.setState({isLoading: true});

        // Convert time

        // Start fetching data

        // Set isLoading false
        console.log(time);
    }

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <LineChartView isLoading={this.state.isLoading} className={classNames(classes.grow, classes.mr)} label='Antall varsler over tid'/>
                <BarChartView isLoading={this.state.isLoading} className={classNames(classes.grow, classes.ml)} label='Kategori distribusjon over tid' />
            </div>
        )
    }
}

export default withStyles(styles)(MainDataDisplay);