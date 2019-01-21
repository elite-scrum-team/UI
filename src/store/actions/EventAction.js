export const actions = {
    SET_EVENT_BY_ID: 'SET_EVENT_BY_ID',
    SET_EVENT_ITEMS: 'SET_EVENT_ITEMS',
};

// --- ACTIONS ---
export const setEvents = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_EVENT_ITEMS, payload: data.map(createEventPost)});
        }
    };

export const setEventById = (id, data) =>
    dispatch => dispatch({type: actions.SET_EVENT_BY_ID, payload: data, id: id});


// --- SELECTORS ---
const getEventPostState = (state) => state.event;

export const getEventById = (id) => (state) =>  getEventPostState(state).events[id];


// --- Helper Methods ---
export const createEventPost = (event) => {

    // Initialize location
    const locationData = event.location ? event.location.coordinate.coordinates : [];
    const location = {
        lat: locationData[0],
        lng: locationData[1],
    };

    // Initialize images
    const images = event.images ? event.images.map(m => m.fileURL) : [];

    return {
        ...event,
        id: event.id,
        title: event.title,
        createdAt: event.createdAt,
        toTime: event.toTime,
        fromTime: event.fromTime,
        description : event.description,
        location : location,
        images: images,
        municipalityId: event.location && event.location.municipality ? event.location.municipality.id : null,
        municipality: event.location && event.location.municipality ? event.location.municipality.name : 'Ukjent',
    }
};
