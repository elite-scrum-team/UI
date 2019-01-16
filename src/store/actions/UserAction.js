export const actions = {
    SET_USER_DATA: 'USR_SET_USER_DATA',
    GET_USER_DATA: 'GET_USER_DATA',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
};

// --- ACTIONS ---

export const setUserData = (data) =>
    dispatch => dispatch({type: actions.SET_USER_DATA, payload: data});

export const clearUserData = () => 
    dispatch => dispatch({type: actions.CLEAR_USER_DATA});

// --- SELECTORS ---
const getUserState = (state) => state.user;

export const getUserData = (state) =>  getUserState(state);
