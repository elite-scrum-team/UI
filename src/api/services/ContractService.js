import API from '../api';
/**
 * @module
 * ContractService - gets info about the contract with a company
 */
export default class ContractService {
  /**
   * Create a contract to a company on the warning
   * @param {string} warningId - The id of current warning
   * @param {string} groupId - The id of the company
   * @param {string} description - Brief description when you create a new contract with a company
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static createContract(warningId, groupId, description, callback) {
    const response = API.createContract(
      warningId,
      groupId,
      description
    ).response();
    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  }
  /**
   * Get all the companies can be chosen
   * @param {Function} callback - Provides isError and data as arguments
   * @return A promise :D
   */
  static getAllCompanies(callback) {
    const response = API.getAllCompanies().response();
    return response.then(data => {
      !callback || callback(response.isError, data);
      return data;
    });
  }
}
