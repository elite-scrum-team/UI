import API from "../api";
import * as WarningAction from '../../store/actions/WarningAction';
import store from '../../store/store'

// and all the methods will return a promise
export default class WarningService {
    static getWarnings = async (orderBy = null, callback) => {
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

            data = data.map(WarningAction.createWarningPost);

            !callback || callback(response.isError, data);
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
        return response.then(async (data) => {
            console.log("WARNING DATA: ", data);
            // Add images if no error
            if(response.isError === false && images instanceof Array) {
                images.forEach(await (async (image) => {
                    // Upload image to server
                    await API.addWarningImage(data.id, image).response(true).then((imageData) => {
                        if(data.images instanceof Array) {
                            data.images.push(imageData.image);
                        }
                    });
                }));
            }
            console.log("End data", data);
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static getWarningItems = (id, callback) => {
        // Check if items are in store
        let items = WarningAction.getWarningItems(id)(store.getState());

        // If they already exist...return
        if(items) {
            !callback || callback(false, items);
            return Promise.resolve(items);
        }
        
        // Get from database
        const response = API.getWarningContent(id).response();
        return response.then((data) => {
            if(response.isError === false) {
                WarningAction.setWarningItem(id, data)(store.dispatch);
            }
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static addWarningItem = (id, type, data) => {
        const object = {type, data};

        WarningAction.addWarningItem(id, object);
    }

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
