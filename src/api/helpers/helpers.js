import { METHODS } from './config';

// Sends a normal request with a given method, url and data
export const request = (method, url, headers, data) => {
    const fetchObject =  {
        method: method,
        headers: headers,
    };

    if(method !== METHODS.get) {
        fetchObject.body = JSON.stringify(data);
    }

    return fetch(url, fetchObject)
    .catch((error) => console.log(error));
};


// Sends a request with form data
export const formRequest = (method, url, headers, data) => {

    // Set data
    let formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }

    delete headers['Content-Type']

    return fetch(url, {
        method: method,
        headers: headers,
        body: formData
    })
    .catch((error) => console.log(error));
};