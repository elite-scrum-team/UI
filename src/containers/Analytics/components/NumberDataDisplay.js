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
        isLoadingStatuses: false,

        warningCountWeek: 0,
        warningCountMonth: 0,
        warningCountYear: 0,

        warningFinishedCount: 0,
        warningProgressCount: 0,
        warningRejectedCount: 0,
    }

    async reloadData(timeObject = {}, municipalityId = null) {
        // Set isLoading true,
        this.setState({isLoading: true, isLoadingStatuses: true});

        // Convert time

        // Start fetching data
        const startDates = [timeObject.sevenDaysAgo, timeObject.thirtyDaysAgo, timeObject.oneYearAgo];
        await AnalyticsService.getWarningCountData(startDates, timeObject.endDate, municipalityId, null,
            (isError, data) => {
                console.log(data);
                if(data && data.length === 3) {
                    this.setState({
                        warningCountWeek: data[0].count,
                        warningCountMonth: data[1].count,
                        warningCountYear: data[2].count,
                    })
                } else if(data.length === 0) {
                    this.setState({
                        warningCountWeek: 0,
                        warningCountMonth: 0,
                        warningCountYear: 0,
                    })
                }
                this.setState({isLoading: false});

                
            }
        );

        await this.getStatusData(timeObject.startDate, timeObject.endDate, municipalityId, 2, (isError, data) => {
            console.log(isError, data);
            if(isError === false && data) {
                const result = data.length > 0 ? data[0] : {count: 0};
                this.setState({warningProgressCount: result.count});
            }
        });

        await this.getStatusData(timeObject.startDate, timeObject.endDate, municipalityId, 3, (isError, data) => {
            if(isError === false && data) {
                const result = data.length > 0 ? data[0] : {count: 0};
                this.setState({warningFinishedCount: result.count});
            }
        });

        await this.getStatusData(timeObject.startDate, timeObject.endDate, municipalityId, 4, (isError, data) => {
            if(isError === false && data) {
                const result = data.length > 0 ? data[0] : {count: 0};
                this.setState({warningRejectedCount: result.count});
            }
            this.setState({isLoadingStatuses: false});
        });

        // Set isLoading false
        console.log(timeObject);
    }

    getStatusData = (startDate, endDate, municipalityId = null, status, callback) => {
        return AnalyticsService.getWarningCountData([startDate], endDate, municipalityId, status,
            (isError, data) => {
                !callback || callback(isError, data);
            }
        );
    }

    render() {
        // Styling
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <NumberView isLoading={this.state.isLoadingStatuses} number={this.state.warningRejectedCount} label='varsler som er "Avslått"'/>
                <NumberView isLoading={this.state.isLoadingStatuses} number={this.state.warningProgressCount} label='varsler som er "Pågående"'/>
                <NumberView isLoading={this.state.isLoadingStatuses} number={this.state.warningFinishedCount} label='varsler som er "Ferdig"'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountYear} label='nye varsler siste 12 måneder'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountMonth} label='nye varsler siste måneden'/>
                <NumberView isLoading={this.state.isLoading} number={this.state.warningCountWeek} label='nye varsler siste 7 dagene'/>
            </div>
        )
    }
}

export default withStyles(styles)(NumberDataDisplay);