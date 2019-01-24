// import API from '../api';
import moment from 'moment';

// and all the methods will return a promise
export default class AnalyticsService {
    
    static getCurrentDate = (callback) => {
        return moment().toISOString();
    }
}