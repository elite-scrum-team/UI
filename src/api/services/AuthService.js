import AUTH from '../auth';

// The userservice will do user related things,
// and all the methods will return a promise
export class AuthService {

    async static createUser(email, password) {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        return AUTH.createUser(email, password);
    }

    // The log in method,
    async static token(email, password) {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        return AUTH.token(email, password);
    }
}