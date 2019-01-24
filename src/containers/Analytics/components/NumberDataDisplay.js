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

        warningCountWeek: 0,
        warningCountMonth: 0,
        warningCountYear: 0,

        warningFinishedYear: 0,
        warningProgressYear: 0,
    }

    async reloadData(timeObject = {}, municipalityId = null) {
        // Set isLoading true,
        this.setState({isLoading: true});

        // Convert time

        // Start fetching data
        const startDates = [timeObject.sevenDaysAgo, timeObject.thirtyDaysAgo, timeObject.oneYearAgo];
        await AnalyticsService.getWarningCountData(startDates, municipalityId, null,
            (isError, data) => {
                console.log(data);
                if(data && data.length === 3) {
                    this.setState({
                        warningCountWeek: data[0].count,
                        warningCountMonth: data[1].count,
                        warningCountYear: data[2].count,
                    })
                }
                this.setState({isLoading: false});

                
            }
        );

        await AnalyticsService.getWarningCountData([timeObject.oneYearAgo], municipalityId, 3,
            (isError, data) => {
                console.log(data);
                if(data && data.length === 1) {
                    this.setState({
                        warningFinishedYear: data[0].count,
                    })
                }
                this.setState({isLoading: false});

                
            }
        );


        // Set isLoading false
        console.log(timeObject);
    }

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningFinishedYear} label='warnings set "Finished" this year'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningProgressYear} label='warnings set "In progress" this year'/>
                <div />
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountYear} label='new warnings this year'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountMonth} label='new warnings this month'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountWeek} label='new warnings this week'/>
            </div>
        )
    }
}

export default withStyles(styles)(NumberDataDisplay);