import API from '../api';
import * as WarningAction from '../../store/actions/WarningAction';
import store from '../../store/store';
import CategoryService from './CategoryService';
/**
 * @module
 * WarningService - gets warning's data
 */
export default class WarningService {
  /**
   * Get all the warnings
   * @function
   * @param {string} orderBy -
   * @param {Object} filters - The filter object
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getWarnings = async (orderBy = null, filters = {}, callback) => {
    let response = null;

    if (!filters.dateSort) {
      filters.dateSort = 'DESC';
    }

    // Checks if warnings should be fetched by location
    if (filters && filters.location) {
      const location = filters.location;
      delete filters.location;
      response = API.getWarningsClose(
        location.lat,
        location.lng,
        filters
      ).response();
    } else {
      response = API.getWarnings(filters).response();
    }

    return response.then(data => {
      data = data || [];

      if (!(data instanceof Array)) {
        data = [];
      }

      // If orderby is provided, sort the data
      if (orderBy) {
        for (const key in orderBy) {
          data = data.sort((a, b) => (a[key] === b[key] ? 0 : a[key] ? 1 : -1));
        }
      }

      // WarningAction.setWarningPost(data)(store.dispatch);
      data = data.map(WarningAction.createWarningPost);

      !callback || callback(response.isError, data);
      return Promise.resolve(data);
    });
  };
  /**
   * Get a warning by id
   * @function
   * @param {string} id - The id of the warning
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getWarning = async (id, callback) => {
    // Check store if warning exist.
    let warning = WarningAction.getWarningById(id)(store.getState());

    if (warning) {
      !callback || callback(false, warning);
      return Promise.resolve(warning);
    } else {
      // Fetch
      const response = API.getWarning(id).response();
      return response.then(async data => {
        await WarningAction.setWarningById(id, data)(store.dispatch);
        warning = WarningAction.getWarningById(id)(store.getState());
        !callback || callback(response.isError, warning);
      });
    }
  };

  /**
   * Create a new warning
   * @function
   * @param {Object} item - The warning item object
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createWarning = (item, callback) => {
    // Split images and other data
    const images = item.images;
    delete item.images;

    // Create warning
    const response = API.createWarning(item).response();
    return response.then(async data => {
      // Add images if no error
      if (response.isError === false && images instanceof Array) {
        for (var index in images) {
          // Upload images to server
          await API.addWarningImage(data.id, images[index])
            .response(true)
            .then(imageData => {
              if (data.images instanceof Array && imageData) {
                data.images.push(imageData.image);
              }
            });
        }
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Get the warning items
   * @function
   * @param {Object} id - The warning id
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getWarningItems = (id, callback) => {
    // Check if items are in store
    let items = null; //WarningAction.getWarningItems(id)(store.getState());

    // If they already exist...return
    if (items) {
      !callback || callback(false, items);
      return Promise.resolve(items);
    }

    // Get from database
    const response = API.getWarningContent(id).response();
    return response.then(data => {
      if (response.isError === false) {
        WarningAction.setWarningItem(id, data)(store.dispatch);
      }
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Add the warning item
   * @function
   * @param {string} id - The id of the warning
   * @param {string} type - Comments,contracts ang statuses
   * @param {Object} data - data object
   */
  static addWarningItem = (id, type, data) => {
    const object = { type, data };

    WarningAction.addWarningItem(id, object);
  };
  /**
   * Update the warning
   * @function
   * @param {string} warningId - The id of current warning
   * @param {Object} warningData - The new warning object
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static updateWarning = (id, warningData, callback) => {
    const response = API.updateWarning(id, warningData).response();
    return response.then(async data => {
      if (response.isError === false) {
        // Check if category was provided, if so, get category object, and add it to the store
        if (warningData.categoryId) {
          const category = await CategoryService.getCategory(
            warningData.categoryId
          );
          data.category = category;
          if (category) {
            WarningAction.updateWarningItem(id, data)(store.dispatch);
          }
        }
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };

  /**
   * Create the status of the warning
   * @function
   * @param {string} warningId - The id of current warning
   * @param {string} type - The type of the status
   * @param {string} description - The description of the status
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createStatus = (warningId, type, description, callback) => {
    const statusObject = { warningId, type, description: description };

    const response = API.addStatus(statusObject).response();

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Create a comment to the warning
   * @function
   * @param {string} warningId - The id of current warning
   * @param {string} comment - The text comment you made
   * @param {string} image - The image under the comment
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createComment = (warningId, comment, image = null, callback) => {
    comment = comment.trim();
    if (!comment) return;

    const response = API.commentOnWarning(warningId, image, comment).response(
      true
    );

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };

  /**
   * Get contracts
   * @function
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */

  static getContracts = callback => {
    const response = API.getContracts().response();

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Get a contract
   * @function
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getContract = callback => {
    const response = API.getContracts().response();

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Create a contract to a company on the warning
   * @function
   * @param {string} warningId - The id of current warning
   * @param {string} groupId - The id of the company
   * @param {string} description - Brief description when you create a new contract with a company
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createContract = (warningId, groupId, description, callback) => {
    if (!description) return;
    description = description.trim();

    const response = API.createContract(warningId, groupId, description);

    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  };
}
