import AUTH from '../auth';
import { TOKEN } from '../helpers/http';

// The userservice will do user related things,
// and all the methods will return a promise
export class AuthService {

    async static createUser(email, password) {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.createUser(email, password).response();
        return response;
    }

    // The log in method,
    async static token(email, password) {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.token(email, password).response();
        return response.then((data) => {
            if(response.isError === false && data && data.token) {
                TOKEN.set(data.token);
            }
        });
    }
}