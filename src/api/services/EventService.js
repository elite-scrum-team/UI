import API from '../api';
import * as EventAction from '../../store/actions/EventAction';
import store from '../../store/store';

/**
 * @module
 * EventService - gets data of the events
 */
export default class eventService {
  /**
   * Get all the events
   * @function
   * @param {string} orderBy - Sort the events by using it
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getEvents = async (orderBy = null, callback) => {
    const response = API.getAllEvents().response();
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

      data = data.map(EventAction.createEventPost);

      !callback || callback(response.isError, data);
      return Promise.resolve(data);
    });
  };
  /**
   * Get the event by id
   * @function
   * @param {string} id - The event id
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getEvent = async (id, callback) => {
    // Check store if event exist.
    let event = EventAction.getEventById(id)(store.getState());

    if (event) {
      !callback || callback(false, event);
      return Promise.resolve(event);
    } else {
      // Fetch
      const response = API.getEventById(id).response();
      return response.then(async data => {
        await EventAction.setEventById(id, data)(store.dispatch);
        event = EventAction.getEventById(id)(store.getState());
        !callback || callback(response.isError, event);
      });
    }
  };
  /**
   * Get the events by municipality
   * @function
   * @param {string} municipalityId - The municipality id
   * @param {string} orderBy - Sort the events by using it
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getEventsByMunicipality = async (
    municipalityId,
    orderBy = null,
    callback
  ) => {
    const response = API.getMunicipalityEvent(municipalityId).response();
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

      data = data.map(EventAction.createEventPost);

      !callback || callback(response.isError, data);
      return Promise.resolve(data);
    });
  };
  /**
   * Update the event
   * @function
   * @param {Object} item - The event object
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static updateEvent = (item, callback) => {
    console.log(1);
    // Split images and other data
    const images = item.image;
    delete item.image;

    // Update event
    const response = API.updateEvent(item.id, item).response();
    console.log(response);

    return response.then(async data => {
      console.log(2);

      // Add images if no error
      if (response.isError === false && images instanceof Array) {
        console.log(3);
        for (let index in images) {
          // Upload images to server
          await API.updateImageEvent(data.id, images[index])
            .response(true)
            .then(imageData => {
              if (data.image instanceof Array && imageData) {
                data.image.push(imageData.image);
              }
            });
        }
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Create a new event
   * @function
   * @param {Object} item - The event object
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createEvent = (item, callback) => {
    // Split images and other data
    const images = item.image;
    delete item.image;

    // Create event
    const response = API.createEvent(item).response();
    return response.then(async data => {
      // Add images if no error
      if (response.isError === false && images instanceof Array) {
        for (let index in images) {
          // Upload images to server
          await API.addEventImage(data.id, images[index])
            .response(true)
            .then(imageData => {
              if (data.image instanceof Array && imageData) {
                data.image.push(imageData.image);
              }
            });
        }
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };
}
