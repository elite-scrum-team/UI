import API from "../api";
import * as WarningAction from '../../store/actions/WarningAction';
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
            return response.then(async (data) => {
                await WarningAction.setWarningById(id, data)(store.dispatch);
                warning = WarningAction.getWarningById(id)(store.getState());
                !callback || callback(response.isError, warning);
            });
        }
    };

    //data object is going to contain details and possible images.
    static createWarning = (item ,callback) => {
        // Split images and other data
        const images = item.images;
        delete item.images;

        // Create warning
        const response = API.createWarning(item).response();
        return response.then((data) => {
            // Add images if no error
            if(response.isError === false && images instanceof Array) {
                images.forEach(async (image) => {
                    await API.addWarningImage(data.id, image).response(true).then();
                });
            }
            !callback || callback(response.isError, data);
            return data;
        });
    };

    // --- STATUS ---
    static createStatus = (warningId, type, description, callback) => {
        const statusObject = {warningId, type, description: description};

        const response = API.addStatus(statusObject).response();
        return response.then((data) => {
            !callback || callback(response.isError, data);
            return data;
        });
    }

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
