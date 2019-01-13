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
const createWarningPost = (warning) => ({
    ...warning,
    title : warning.title,
    warnDate: warning.warnDate,
    status: warning.status,
    province: warning.province,
    statusMessage: warning.statusMessage,
    description : warning.description,
    location : warning.location,
    images : warning.images,
    items : warning.items,
});
