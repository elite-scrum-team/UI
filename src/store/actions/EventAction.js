export const actions = {
    GET_ALL_EVENTS: 'GET_ALL_EVENTS',
    GET_EVENT_ITEM: 'GET_EVENT_ITEM',
    SET_EVENT_POSTS: 'SET_EVENT_POSTS',
    SET_EVENT_BY_ID: 'SET_EVENT_BY_ID',
    SET_EVENT_ITEMS: 'SET_EVENT_ITEMS',
    SET_EVENT_ITEM: 'SET_EVENT_ITEM',
    ADD_EVENT_ITEM: 'ADD_EVENT_ITEM',
};

// --- ACTIONS ---
export const setEventPost = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_EVENT_POSTS, payload: data.map(createEventPost)});
        }
    };

export const setEventById = (id , data) =>
    dispatch => dispatch({type: actions.SET_EVENT_BY_ID, payload: createEventPost(data), id: id});


export const setEventItems = (data) =>
    dispatch => {
        if(data instanceof Array) {
            dispatch({type: actions.SET_EVENT_ITEMS, payload: data})
        }
    };

export const setEventItem = (id, data) =>
    dispatch => dispatch({type: actions.SET_EVENT_ITEM, payload: data, id: id});


export const addEventItem = (id, data) =>
    dispatch => dispatch({type: actions.ADD_EVENT_ITEM, payload: data, id: id});


// --- SELECTORS ---
const getEventPostState = (state) => state.event;

export const getEventById = (id) => (state) =>  getEventPostState(state).event[id];

export const getEventItems = (id) => (state) => getEventPostState(state).eventItems[id];

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
        title: categoryData,
        createdAt: event.createdAt,
        description : event.description,
        location : location,
        images: images,
        municipalityId: event.location && event.location.municipality ? event.location.municipality.id : null,
        municipality: event.location && event.location.municipality ? event.location.municipality.name : 'Ukjent',
    }
};
