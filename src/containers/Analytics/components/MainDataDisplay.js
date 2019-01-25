import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';

// Services
import AnalyticsService from '../../../api/services/AnalyticsService';

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
        warningDistributionData: {},
        categoryDistributionData: {},
    }

    reloadData(timeObject = {}, municipalityId = null) {
        // Set isLoading true,
        this.setState({isLoading: true});

        console.log("Municipality: ", municipalityId);

        // Start fetching data
        AnalyticsService.getDistributionData(timeObject.startDate, timeObject.endDate, municipalityId, timeObject.dateFormat,
            (isError, data) => {
                if(isError === false && data && data.warning && data.category) {
                     // Configure warnign data
                    const warningData = data.warning.reduce((acc, val) => {
                        acc[val.date] = val.count;
                        return acc;
                    }, timeObject.allDates || {});

                    // Configure category data
                    const categoryData = data.category.reduce((acc, val) => {
                        acc[val.name] = val.warnings;
                        return acc;
                    }, {});
                    this.setState({
                        warningDistributionData: warningData,
                        categoryDistributionData: categoryData
                    });
                }
               

                this.setState({isLoading: false});
                console.log(data);
            }
        )

        // Set isLoading false
        console.log(timeObject);
    }

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <LineChartView
                    isLoading={this.state.isLoading}
                    className={classNames(classes.grow, classes.mr)}
                    label='Antall varsler over tid'
                    data={this.state.warningDistributionData}/>
                <BarChartView
                    isLoading={this.state.isLoading}
                    className={classNames(classes.grow, classes.ml)}
                    label='Kategori distribusjon i perioden'
                    data={this.state.categoryDistributionData} />
            </div>
        )
    }
}

export default withStyles(styles)(MainDataDisplay);