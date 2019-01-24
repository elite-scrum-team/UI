import API from '../api';
import moment from 'moment';

// and all the methods will return a promise
export default class AnalyticsService {
    
    static getDistributionData = (startDate, endDate, municipality, dateFormat, callback) => {
        const response = API.getDistributions(startDate, endDate, municipality, dateFormat).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static getCurrentDate = (callback) => {
        return moment().toISOString();
    }
}