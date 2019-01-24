import API from '../api';
import moment from 'moment';

// and all the methods will return a promise
export default class AnalyticsService {
    
    static getDistributionData = (startDate, municipality, dateFormat, callback) => {
        const filters = {startDate, dateFormat};
        if(municipality) {
            filters.municipality = municipality;
        }

        const response = API.getDistributions(filters).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static getWarningCountData = (startDates, municipality, status = undefined, callback) => {
        const filters = {startDate: startDates};
        if(status) {
            filters.status = status;
        }
        if(municipality) {
            filters.municipality = municipality;
        }
        const response = API.getCounts(filters).response();

        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static getCurrentDate = (callback) => {
        return moment().toISOString();
    }
}