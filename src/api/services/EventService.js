import API from "../api";
import * as EventAction from '../../store/actions/EventAction';
import store from '../../store/store';

// and all the methods will return a promise
export default class eventService {

    static getEvents = async (orderBy = null, callback) => {
        const response = API.getAllEvents().response();
        return response.then((data) => {
            data = data || [];

            if(!(data instanceof Array)) {
                data = [];
            }

            // If orderby is provided, sort the data
            if(orderBy) {
                for(const key in orderBy) {
                    data = data.sort((a, b) => (a[key] === b[key])? 0 : a[key] ? 1 : -1)
                }
            }

            data = data.map(EventAction.createEventPost);

            !callback || callback(response.isError, data);
            return Promise.resolve(data);
        });
    };

    static getEvent = async (id, callback) => {
        // Check store if event exist.
        let event = EventAction.getEventById(id)(store.getState());

        if(event) {
            !callback || callback(false, event);
            return Promise.resolve(event)
        } else {
            // Fetch
            const response = API.getEventById(id).response();
            return response.then(async (data) => {
                await EventAction.setEventById(id, data)(store.dispatch);
                event = EventAction.getEventById(id)(store.getState());
                !callback || callback(response.isError, event);
            });
        }
    };

    static getEventsByMunicipality = async (municipalityId, orderBy = null,  callback) => {
        const response = API.getMunicipalityEvent(municipalityId).response();
        return response.then((data) => {
            data = data || [];

            if(!(data instanceof Array)) {
                data = [];
            }

            // If orderby is provided, sort the data
            if(orderBy) {
                for(const key in orderBy) {
                    data = data.sort((a, b) => (a[key] === b[key])? 0 : a[key] ? 1 : -1)
                }
            }

            data = data.map(EventAction.createEventPost);

            !callback || callback(response.isError, data);
            return Promise.resolve(data);
        });
    };

    static updateEvent = (item ,callback) => {
        // Split images and other data
        const images = item.image;
        delete item.image;

        // Update event
        const response = API.updateEvent(item.id, item).response();
        return response.then(async (data) => {
            // Add images if no error
            if(response.isError === false && images instanceof Array) {
                for(let index in images) {
                    // Upload images to server
                    await API.updateImageEvent(data.id, images[index]).response(true)
                        .then((imageData) => {
                            if(data.image instanceof Array && imageData) {
                                data.image.push(imageData.image);
                            }
                        })
                }
            }

            !callback || callback(response.isError, data);
            return data;
        });
    };


    //data object is going to contain details and possible images.
    static createEvent = (item ,callback) => {
        // Split images and other data
        const images = item.image;
        delete item.image;

        // Create event
        const response = API.createEvent(item).response();
        return response.then(async (data) => {
            // Add images if no error
            if(response.isError === false && images instanceof Array) {
                for(let index in images) {
                    // Upload images to server
                    await API.addEventImage(data.id, images[index]).response(true)
                        .then((imageData) => {
                            if(data.image instanceof Array && imageData) {
                                data.image.push(imageData.image);
                            }
                        })
                }
            }

            !callback || callback(response.isError, data);
            return data;
        });
    };
}
