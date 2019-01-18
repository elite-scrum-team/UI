export const actions = {
    GET_ALL_WARNINGS: 'GET_ALL_WARNINGS',
    GET_WARNING_ITEM: 'GET_WARNING_ITEM',
    SET_WARNING_POSTS: 'SET_WARNING_POSTS',
    SET_WARNING_BY_ID: 'SET_WARNING_BY_ID',
    SET_WARNING_ITEMS: 'SET_WARNING_ITEMS',
    SET_WARNING_ITEM: 'SET_WARNING_ITEM',
    ADD_WARNING_ITEM: 'ADD_WARNING_ITEM',
};

// --- ACTIONS ---
export const setWarningPost = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_WARNING_POSTS, payload: data.map(createWarningPost)});
        }
    };

export const setWarningById = (id , data) =>
    dispatch => dispatch({type: actions.SET_WARNING_BY_ID, payload: createWarningPost(data), id: id});


export const setWarningItems = (data) => 
    dispatch => {
        if(data instanceof Array) {
            dispatch({type: actions.SET_WARNING_ITEMS, payload: data})
        }
    }

export const setWarningItem = (id, data) => 
    dispatch => dispatch({type: actions.SET_WARNING_ITEM, payload: data, id: id});


export const addWarningItem = (id, data) =>
    dispatch => dispatch({type: actions.ADD_WARNING_ITEM, payload: data, id: id});


// --- SELECTORS ---
const getWarningPostState = (state) => state.warning;

export const getWarningById = (id) => (state) =>  getWarningPostState(state).warning[id];

export const getWarningItems = (id) => (state) => getWarningPostState(state).warningItems[id];

// --- Helper Methods ---
export const createWarningPost = (warning) => {

    // Initialize location
    const locationData = warning.location ? warning.location.coordinate.coordinates : [];
    const location = {
        lat: locationData[0],
        lng: locationData[1],
    };

    // Initialize category
    const categoryData = warning.category || {id: '1234', name: 'Ukjent problem'};
    
    // Initialize Status
    let statusData = warning.statuses || [];
    statusData = statusData.length > 0 ? statusData[0] : {type: 1, description: ''};
    
    // Initialize images
    const images = warning.images ? warning.images.map(m => m.fileURL) : [];

    return {
        ...warning,
        id: warning.id,
        createdAt: warning.createdAt,
        category: categoryData,
        status: statusData,
        description : warning.description,
        location : location,
        images: images,
        municipalityId: warning.location && warning.location.municipality ? warning.location.municipality.id : null,
        municipality: warning.location && warning.location.municipality ? warning.location.municipality.name : 'Ukjent',
    }
};
