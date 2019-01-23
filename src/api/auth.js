import Fetch from './helpers/http';
import {METHODS} from './helpers/config';

export default {
    // Here will all the auth relatived API

    createUser: (email, password) => {
        return new Fetch(METHODS.post, '/auth/register', {email: email, password: password}, null, false);
    },

    changePassword: (password) => {
        return new Fetch(METHODS.post, '/auth/change', { password: password}, null, true);
    },

    resetPassword: (email) => {
        return new Fetch(METHODS.post, 'auth/forgot', { email: email}, null, false);
    },

    token: (email, password) => {
        return new Fetch(METHODS.post, '/auth/login', {email: email, password: password}, null, false);
    },

    getUserData: () => {
        return new Fetch(METHODS.get, '/auth/user');
    }
}