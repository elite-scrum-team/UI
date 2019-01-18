export const actions = {
    SET_USER_DATA: 'USR_SET_USER_DATA',
    GET_USER_DATA: 'GET_USER_DATA',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
    SET_CURRENT_GROUP: 'USR_SET_CURRENT_GROUP',
};

// --- ACTIONS ---

export const setUserData = (data) =>
    dispatch => dispatch({type: actions.SET_USER_DATA, payload: data});

export const clearUserData = () => 
    dispatch => dispatch({type: actions.CLEAR_USER_DATA});

export const setCurrentGroup = (groupObject) =>
    dispatch => dispatch({type: actions.SET_CURRENT_GROUP, payload: groupObject});

// --- SELECTORS ---
const getUserState = (state) => state.user;

export const getUserData = (state) =>  getUserState(state);

export const getCurrentGroup = (state) => getUserState(state).selectedGroup;
