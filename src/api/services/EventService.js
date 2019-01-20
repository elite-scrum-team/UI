import API from "../api";
import * as EventAction from '../../store/actions/EventAction';
import store from '../../store/store'

// and all the methods will return a promise
export default class WarningService {

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

            // WarningAction.setWarningPost(data)(store.dispatch);
            data = data.map(EventAction.createEventPost);

            !callback || callback(response.isError, data);
            return Promise.resolve(data);
        });
    };

    static getEvent = async (id, callback) => {
        // Check store if warning exist.
        let event = EventAction.getEventById(id)(store.getState());

        if(event) {
            !callback || callback(false, event);
            return Promise.resolve(event)
        } else {
            // Fetch
            const response = API.getEventById(id).response();
            return response.then(async (data) => {
                await EventAction.setEventById(id, data)(store.dispatch);
                warning = EventAction.getEventById(id)(store.getState());
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

            // WarningAction.setWarningPost(data)(store.dispatch);
            data = data.map(EventAction.createEventPost);

            !callback || callback(response.isError, data);
            return Promise.resolve(data);
        });
    };

    //data object is going to contain details and possible images.
    static createEvent = (item ,callback) => {
        // Split images and other data
        const images = item.images;
        delete item.images;

        // Create event
        const response = API.createEvent(item).response();
        return response.then(async (data) => {
            // Add images if no error
            if(response.isError === false && images instanceof Array) {
                for(let index in images) {
                    // Upload images to server
                    await API.addEventImage(data.id, images[index]).response(true)
                        .then((imageData) => {
                            if(data.images instanceof Array && imageData) {
                                data.images.push(imageData.image);
                            }
                        })
                }
            }

            !callback || callback(response.isError, data);
            return data;
        });
    };

    static getEventItems = (id, callback) => {
        // Check if items are in store
        let items = EventAction.getEventItems(id)(store.getState());

        // If they already exist...return
        if(items) {
            !callback || callback(false, items);
            return Promise.resolve(items);
        }

        // Get from database
        const response = API.getEventContent(id).response();
        return response.then((data) => {
            if(response.isError === false) {
                EventAction.setEventItem(id, data)(store.dispatch);
            }
            !callback || callback(response.isError, data);
            return data;
        });
    };

    static addEventItem = (id, type, data) => {
        const object = {type, data};

        EventAction.addEventItem(id, object);
    }

}
