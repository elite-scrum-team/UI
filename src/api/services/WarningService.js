import API from "../api";

// and all the methods will return a promise
export default class WarningService {

    // ---WARNINGS---
    static getWarnings = (callback) => {
        const response = API.getWarnings().response();

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static getWarning = (id,callback) =>{
        const response = API.getWarning(id).response();

        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
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
        const response = API.getCategories().response();

        return response.then((data) => {
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
