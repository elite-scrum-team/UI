import API from '../api';
import moment from 'moment';

/**
 * @module
 * AnalyticsService - gets statistic data
 */
export default class AnalyticsService {
  /**
   * Gets all the data for distribution warning and categories over time
   * @function
   * @param {string} startDate - The start date
   * @param {string} endDate - The end date
   * @param {string} municipality - The municipality id
   * @param {string} dateFormat - Data format to return
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getDistributionData = (
    startDate,
    endDate,
    municipality,
    dateFormat,
    callback
  ) => {
    const filters = { startDate, endDate, dateFormat };
    if (municipality) {
      filters.municipality = municipality;
    }

    const response = API.getDistributions(filters).response();
    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Gets the count data of the warnings
   * @function
   * @param {string} startDates - The start date
   * @param {string} municipality - The municipality id
   * @param {string} status - The status
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getWarningCountData = (
    startDates,
    municipality,
    status = undefined,
    callback
  ) => {
    const filters = { startDate: startDates };
    if (status) {
      filters.status = status;
    }
    if (municipality) {
      filters.municipality = municipality;
    }
    const response = API.getCounts(filters).response();

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Gets the string of current date
   * @function
   * @return the date string
   */
  static getCurrentDate = callback => {
    return moment().toISOString();
  };
}
