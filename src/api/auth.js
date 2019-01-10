import Fetch from './helpers/http';
import {METHODS} from './helpers/config';

export default {
    // Here will all the auth relatived API

    createUser: (email, password) => {
        return new Fetch(METHODS.post, '/auth/register', {email: email, password: password});
    },

    token: (email, password) => {
        return new Fetch(METHODS.post, '/auth/login', {email: email, password: password});
    }
}