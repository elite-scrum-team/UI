export const actions = {
    SET_USER_DATA: 'USR_SET_USER_DATA',
    GET_USER_DATA: 'GET_USER_DATA',
};

// --- ACTIONS ---

export const setUserData = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_USER_DATA, payload: data});
        }
    };
// --- SELECTORS ---
const getUserState = (state) => state.user;

export const getUserData = (state) =>  getUserState(state);
