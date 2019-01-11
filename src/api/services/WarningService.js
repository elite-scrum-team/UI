import API from "../api";

// de snakker med warningservice.
// and all the methods will return a promise
export default class WarningService {

    static getWarnings = (callback) => {
        const response = API.getWarnings().response();

        return response.then(data => {
            !callback || callback(response.isError, data);
        });
    };

    static getWarning = (id,callback) =>{
        const response = API.getWarning(id).response();

        return response.then(data => {
            !callback || callback(response.isError, data);
        });
    };

    //data object is going to contain details and possible images.
    static createWarning = (data ,callback) =>{
        const response = API.createWarning(data).response(true);

        return response.then(data => {
            !callback || callback(response.isError, data);
        });
    };

    static commentOnWarning = (warningId, comment, image = null ,callback) =>{
        comment = comment.trim();

        // checking if comment has is a string and if comment isnt an empty string
        if (typeof comment !== 'string' || comment === '') {
            return;
        }

        const response = API.commentOnWarning(warningId, image, comment).response(true);

        return response.then(data => {
            !callback || callback(response.isError, data);
        });
    }

}
