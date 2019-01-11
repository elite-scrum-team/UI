import API from "../api";

// de snakker med warningservice.
// and all the methods will return a promise
export default class WarningService {

    static getWarnings = (email, password, callback) => {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.createUser(email, password).response();
        return response.then(data => {
            !callback || callback(response.isError, data);
        });
    };
}
