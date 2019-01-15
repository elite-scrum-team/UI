export const actions = {
    GET_ALL_WARNINGS: 'GET_ALL_WARNINGS',
    SET_WARNING_POSTS: 'SET_WARNING_POSTS',
    SET_WARNING_BY_ID: 'SET_WARNING_BY_ID'
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

// --- SELECTORS ---
const getWarningPostState = (state) => state.warning;

export const getWarningById = (id) => (state) =>  getWarningPostState(state).warning[id];


// --- Helper Methods ---
const createWarningPost = (warning) => {

    // Initialize location
    const locationData = warning.location ? warning.location.coordinate.coordinates : [];
    const location = {
        lat: locationData[0],
        lng: locationData[1],
    };

    // Initialize category
    const categoryData = warning.category || {id: '1234', name: 'Problem'};
    
    // Initialize Status
    let statusData = warning.statuses || [];
    statusData = statusData.length > 0 ? statusData[0] : {type: 1, description: ''};
    console.log("StatusData: ", statusData);
    return {
        ...warning,
        id: warning.id,
        createdAt: warning.createdAt,
        category: categoryData,
        status: statusData,
        description : warning.description,
        location : location,
    }
};
