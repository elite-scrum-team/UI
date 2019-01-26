import API from '../api';

/**
 * @module
 * InterestGroupService - about subscription of a warning
 */
export default class InterestGroupService {
  /**
   * Subscribe the update of a specific warning
   * @function
   * @param {string} warningId - The warning's id
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static subscribe = (warningId, callback) => {
    const response = API.subscribeToAWarning(warningId).response();
    return response.then(async data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Cancel the subscription of the warning
   * @function
   * @param {string} warningId - The warning's id
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static unsubscribe = (warningId, callback) => {
    const response = API.unSubscribeToAWarning(warningId).response();
    return response.then(async data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
}
