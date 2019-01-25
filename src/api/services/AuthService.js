import AUTH from '../auth';
import { TOKEN } from '../helpers/http';
import * as UserAction from '../../store/actions/UserAction';
import store from '../../store/store';

/**
 * @module
 * AuthService - gets authentication data for users
 */
export default class AuthService {
  /**
   * A flag check if it has user data
   * @member
   * @type {Boolean}
   */
  static hasUserData = false;
  /**
   * Create a new user
   * @function
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createUser = (email, password, callback) => {
    // Trim and uncapitalize email
    email = email.trim().toLowerCase();

    const response = AUTH.createUser(email, password).response();
    return response.then(async data => {
      if (response.isError === false) {
        await AuthService.token(email, password);
      }

      !callback || callback(response.isError, data);
      return data;
    });
  };

  /**
   * Log in method
   * @function
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static token = (email, password, callback) => {
    // Trim and uncapitalize email
    email = email.trim().toLowerCase();

    const response = AUTH.token(email, password).response();
    return response.then(async data => {
      if (response.isError === false && data && data.token) {
        TOKEN.set(data.token);
        await AuthService.getUserData();
      }
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Gets the user data
   * @function
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getUserData = callback => {
    const userData = UserAction.getUserData(store.getState());

    // Check if userData is in the store
    if (userData.id) {
      !callback || callback(false, userData);
      return Promise.resolve(userData);
    }

    // Otherwise fetch from server
    const response = AUTH.getUserData().response();
    return response.then(data => {
      if (response.isError === false) {
        UserAction.setUserData(data)(store.dispatch);
        data = UserAction.getUserData(store.getState());
        AuthService.hasUserData = true;
      }
      !callback || callback(response.isError, data);
      return data;
    });
  };
  /**
   * Set current group
   * @function
   * @param {Object} - Group object
   */
  static setCurrentGroup = groupObject => {
    UserAction.setCurrentGroup(groupObject)(store.dispatch);
  };
  /**
   * Get the current group
   * @function
   * @return {Object} - Object with group name and id
   */
  static getCurrentGroup = () => {
    return UserAction.getCurrentGroup(store.getState());
  };
  /**
   * Method check if the user is an employee
   * @function
   * @param {string} - The municipality id
   * @return {boolean}
   */
  static isEmployee(municipalityId = null) {
    const roles = UserAction.getUserData(store.getState()).roles;
    if (municipalityId) {
      return (
        roles.groups.filter(e => e.municipalityId === municipalityId).length > 0
      );
    } else {
      const municipalities = roles.groups.filter(
        e => e.municipalityId !== null
      );
      return municipalities.length > 0 ? municipalities[0] : false;
    }
  }
  /**
   * Method check if the user is a company user
   * @return {boolean}
   */
  static isCompany() {
    const roles = UserAction.getUserData(store.getState()).roles || {};
    const groups = roles.groups || [];

    return groups.filter(g => !g.municipalityId).length > 0;
  }
  /**
   * Method check if the user is a company user or an employee
   * @return {boolean}
   */
  static isCompanyOrEmployee() {
    const roles = UserAction.getUserData(store.getState()).roles || {};
    const groups = roles.groups || [];
    return groups.length > 0;
  }
  /**
   * Method check if the user is in the selected group
   * @return {boolean}
   */
  static isSelectedGroup(groupIds) {
    const selectedGroup = AuthService.getCurrentGroup();
    if (!selectedGroup || !groupIds) {
      return false;
    }
    return groupIds.filter(gIds => gIds === selectedGroup.id).length > 0;
  }
  /**
   * Method check if the user is authenticated
   * @return {boolean}
   */
  static isAuthenticated() {
    const isAuthenticated = typeof TOKEN.get() !== 'undefined';
    if (!isAuthenticated && AuthService.hasUserData) {
      UserAction.clearUserData()(store.dispatch);
      AuthService.hasUserData = false;
    }
    return isAuthenticated;
  }
  /**
   * Log ut method, clear user data
   * @return A promise :D
   */
  static logOut() {
    // If not logged in, return
    if (!this.isAuthenticated()) {
      return;
    }

    TOKEN.remove();
    UserAction.clearUserData()(store.dispatch);
  }
  /**
   * Change the existing password
   * @function
   * @param {string} password - The new password
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static changePassword = (password, callback) => {
    if (!AuthService.isAuthenticated()) {
      !callback || callback(true, null);
      return Promise.resolve(null);
    }
    const response = AUTH.changePassword(password).response();
    return response.then(data => {
      !callback || callback(response.isError, data);
    });
  };
  /**
   * Reset the password when the user forgot password
   * @function
   * @param {string} email - The email of the user
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static resetPassword = (email, callback) => {
    if (!email) {
      !callback || callback(true, null);
      return Promise.resolve(null);
    }
    const response = AUTH.resetPassword(email).response();
    return response.then(data => {
      !callback || callback(response.isError, data);
    });
  };
}
