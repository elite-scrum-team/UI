import API from '../api';
import * as LocationAction from '../../store/actions/LocationAction';
import store from '../../store/store';

/**
 * @module
 * LocationService - gets location data
 */
export default class LocationService {
  /**
   * Gets all the municipalities
   * @function
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getMunicipalities = callback => {
    // Check if municipalities exists
    let data = LocationAction.getAllMunicipalites(store.getState());

    // If exists, return
    if (data && data.length > 0) {
      !callback || callback(false, data);
      return Promise.resolve(data);
    }

    // If not, get from database
    const response = API.getMunicipalities().response();
    return response.then(async data => {
      if (response.isError === false) {
        await LocationAction.setAllMunicipalities(data)(store.dispatch);
        data = LocationAction.getAllMunicipalites(store.getState());
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };
}
