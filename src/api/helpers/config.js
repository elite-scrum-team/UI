export const BASE_API_URL = process.env.REACT_APP_API_URL || 'https://35.244.206.109/api/v1'; //https://35.244.206.109

export const TOKEN_HEADER_NAME = 'Authorization'
export const TOKEN_COOKIE_ID = 'access_token';

export const METHODS = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE'
}
