import AUTH from "../auth";
import { TOKEN } from "../helpers/http";
import * as UserAction from '../../store/actions/UserAction';
import store from '../../store/store'

// The userservice will do user related things,
// and all the methods will return a promise
export default class AuthService {

    static hasUserData = false;

    static createUser = (email, password, callback) => {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.createUser(email, password).response();
        return response.then(async data => {
            if(response.isError === false) {
                await AuthService.token(email, password);
            }

            !callback || callback(response.isError, data);
            return data;
        });
    };

    // The log in method,
    static token = (email, password, callback) => {
        // Trim and uncapitalize email
        email = email.trim().toLowerCase();

        const response = AUTH.token(email, password).response();
        return response.then(async (data) => {
            if(response.isError === false && data && data.token) {
                TOKEN.set(data.token);
                await AuthService.getUserData();
            }
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static getUserData = (callback) => {
        const userData = UserAction.getUserData(store.getState());

        // Check if userData is in the store
        if(userData.id) {
            !callback || callback(false, userData);
            return Promise.resolve(userData);
        }

        // Otherwise fetch from server
        const response = AUTH.getUserData().response();
        return response.then((data) => {
            if(response.isError === false) {
                UserAction.setUserData(data)(store.dispatch);
                data = UserAction.getUserData(store.getState());
                AuthService.hasUserData = true;
            }
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static setCurrentGroup = (groupObject) => {
        UserAction.setCurrentGroup(groupObject)(store.dispatch);
    }

    static getCurrentGroup = () => {
        return UserAction.getCurrentGroup(store.getState());
    }

    static isEmployee (municipalityId = null) {
        const roles = UserAction.getUserData(store.getState()).roles;
        if(municipalityId) {
            return roles.groups.filter(e  => e.municipalityId === municipalityId)
        } else {
            const municipalities =  roles.groups.filter(e => e.municipalityId !== null);
            return municipalities.length > 0 ? municipalities[0] : false;
        }
    }

    static isCompany () {
        const roles = UserAction.getUserData(store.getState()).roles || {};
        const groups = roles.groups || [];

        return groups.filter(g => !g.municipalityId).length > 0;
    }

    static isCompanyOrEmployee() {
        const roles = UserAction.getUserData(store.getState()).roles || {};
        const groups = roles.groups || [];
        return groups.length > 0;
    }

    static isAuthenticated () {
        const isAuthenticated = typeof TOKEN.get() !== 'undefined';
        if(!isAuthenticated && AuthService.hasUserData) {
            UserAction.clearUserData()(store.dispatch);
            AuthService.hasUserData = false;
        }
        return isAuthenticated;
    }

    static logOut() {
        // If not logged in, return
        if(!this.isAuthenticated()) {
            return;
        }
        
        TOKEN.remove();
        UserAction.clearUserData()(store.dispatch);
    }
}
