/**
 * @module
 * GeoService - gets geographical location
 */
export default class GeoService {
  /**
   * Update the warning
   * @function
   * @param {Function} onSuccess - Get called if successfully
   * @param {Function} errorCallback - Get called if error
   * @return A promise :D
   */
  static getGeoLocation = (onSuccess, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          !onSuccess || onSuccess(position);
        },
        error => {
          !errorCallback || errorCallback(error);
        },
        {
          timeout: 5000
        }
      );
    } else {
      console.warn('Can not get Geo Location');
    }
  };
}
