// Sends a normal request with a given method, url and data
export const request = (method, url, headers, data) => {
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    })
    .catch((error) => console.log(error));
};

// Sends a request with form data
export const formRequest = (method, url, headers, data) => {

    // Set data
    let formData: FormData = new FormData();
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