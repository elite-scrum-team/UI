import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Services
import AnalyticsService from '../../../api/services/AnalyticsService';

// Material UI components

// Icons

// Project components
import NumberView from './chartViews/NumberView';

const styles = {
    root: {
         display: 'grid',
         gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
         gridGap: '14px',
 
         '@media only screen and (max-width: 1100px)': {
             gridTemplateColumns: '1fr 1fr 1fr',
         },

         '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr 1fr',
        },

         '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '1fr',
        }
     },
};

class NumberDataDisplay extends Component {

    state = {
        isLoading: false,
    }

    reloadData(timeObject = {}, municipalityId = null) {
        // Set isLoading true,
        this.setState({isLoading: true});

        // Convert time

        // Start fetching data
        AnalyticsService.getDistributionData(timeObject.startDate, timeObject.endDate,
            municipalityId, timeObject.dateFormat,
            (isError, data) => {
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
                <NumberView isLoading={this.state.isLoading} number={27} label='warnings set "Finished" this month'/>
                <NumberView isLoading={this.state.isLoading} number={23} label='warnings set "In progress" this year'/>
                <div />
                <NumberView isLoading={this.state.isLoading} number={27} label='new warnings this year'/>
                <NumberView isLoading={this.state.isLoading} number={23} label='new warnings this month'/>
                <NumberView isLoading={this.state.isLoading} number={12} label='new warnings this week'/>
            </div>
        )
    }
}

export default withStyles(styles)(NumberDataDisplay);