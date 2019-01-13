import API from "../api";
import * as WarningAction from '../../store/actions/WarningAction';
import * as CategoryAction from '../../store/actions/CategoryAction';
import store from '../../store/store'

// and all the methods will return a promise
export default class WarningService {
    static getWarnings = async (orderBy = null) => {
        const response = API.getWarnings().response();
        return response.then((data) => {
            data = data || [];

            // If orderby is provided, sort the data
            if(orderBy) {
                for(const key in orderBy) {
                    data = data.sort((a, b) => (a[key] === b[key])? 0 : a[key] ? 1 : -1)
                }
            }

            WarningAction.setWarningPost(data)(store.dispatch);
            return Promise.resolve(data);
        });
    };

    static getWarning = async (id, callback) => {
        // Check store if warning exist.
        let warning = WarningAction.getWarningById(id)(store.getState());

        if(warning) {
            !callback || callback(false, warning);
            return Promise.resolve(warning)
        } else {
            // Fetch
            const response = API.getWarning(id).response()
            return response.then((data) => {
                WarningAction.setWarningById(id, data);
                warning = WarningAction.getWarningById(id)(store.getState());
                !callback || callback(response.isError, warning);
            });
        }
    };

    //data object is going to contain details and possible images.
    static createWarning = (data ,callback) =>{
        const response = API.createWarning(data).response(true);

        if(!data) return;

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    // --- COMMENTS ---

    static createComment = (warningId, comment, image = null ,callback) =>{
        comment = comment.trim();

        if (!comment) return;

        const response = API.commentOnWarning(warningId, image, comment).response(true);

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    // --- CATEGORIES ---

    static getCategories = (callback) => {
        // Check if categories exists
        const categories = CategoryAction.getAllCategories(store.getState());

        // If categories is already stored
        if(categories && categories.length > 0) {
            !callback || callback(false, categories);
            return Promise.resolve(categories);
        }

        // If not, fetch from API
        const response = API.getCategories().response();

        return response.then((data) => {
            CategoryAction.setAllCategories(data)(store.dispatch);
            data = CategoryAction.getAllCategories(store.getState());
            !callback || callback(response.isError, data);
            return data;
        });
    }

    // --- CONTRACTS ---
    static getContracts = (callback) => {
        const response = API.getContracts().response();

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static getContract = (callback) => {
        const response = API.getContracts().response();

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static createContract = (warningId, groupId, description, callback) =>{
        if(!description) return;
        description = description.trim();

        const response = API.createContract(warningId,groupId,description);

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });

    };
}
