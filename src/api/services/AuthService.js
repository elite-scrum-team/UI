import AUTH from "../auth";
import { TOKEN } from "../helpers/http";

// The userservice will do user related things,
// and all the methods will return a promise
export default class AuthService {
    static createUser = (email, password, callback) => {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.createUser(email, password).response();
        return response.then(data => {
            !callback || callback(response.isError, data);
            return data;
        });
    };

    // The log in method,
    static token = (email, password, callback) => {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.token(email, password).response();
        return response.then((data) => {
            if(response.isError === false && data && data.token) {
                TOKEN.set(data.token);
            }
            !callback || callback(response.isError, data);
            return data;
        });
    }

    static isAuthenticated () {
        return typeof TOKEN.get() !== 'undefined'
    }

    static logOut() {
        // If not logged in, return
        if(!this.isAuthenticated()) {
            return;
        }

        TOKEN.remove();
    }
}
