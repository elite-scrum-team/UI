import API from "../api";
import store from '../../store/store'

// and all the methods will return a promise
export default class ContractService {
    // --- CONTRACT ---

    static createContract(warningId, groupId, description, callback) {
        const response = API.createContract(warningId, groupId, description).response();
        return response.then((data) => {
            !callback || callback(data);
            return data;
        });
    }

    static getAllCompanies(callback) {
        const response = API.getAllCompanies().response();
        return response.then((data) => {
            !callback || callback(data);
            return data;
        });
    }
}