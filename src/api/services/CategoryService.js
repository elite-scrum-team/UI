import API from '../api';
import * as CategoryAction from '../../store/actions/CategoryAction';
import store from '../../store/store';

/**
 * @module
 * CategoryService - gets category data
 */
export default class CategoryService {
  /**
   * Gets all the categories
   * @function
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getCategories = callback => {
    // Check if categories exists
    const categories = CategoryAction.getAllCategories(store.getState());

    // If categories is already stored
    if (categories && categories.length > 0) {
      !callback || callback(false, categories);
      return Promise.resolve(categories);
    }

    // If not, fetch from API
    const response = API.getCategories().response();

    return response.then(data => {
      CategoryAction.setAllCategories(data)(store.dispatch);
      data = CategoryAction.getAllCategories(store.getState());
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Gets one category by id
   * @function
   * @param {string} id - The category id
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getCategory = (id, callback) => {
    const category = CategoryAction.getCategoryById(id)(store.getState());

    if (category) {
      !callback || callback(false, category);
      return Promise.resolve(category);
    }

    // Fetch from server
    const response = API.getCategoryById(id).response();
    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
}
