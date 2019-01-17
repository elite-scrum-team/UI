export const actions = {
    SET_MUNICIPALITIES: 'L_SET_MUNICIPALITIES',
};

// --- ACTIONS ---

export const setAllMunicipalities = (data) =>
    dispatch => {
        if (data instanceof Array) {
            dispatch({type: actions.SET_MUNICIPALITIES, payload: data.map(createMunicipality)});
        }
    };

// --- SELECTORS ---
const getLocationState = (state) => state.location;

export const getAllMunicipalites = (state) =>  getLocationState(state).municipalities;

// --- Helper Methods ---
const createMunicipality = (m) => ({
    ...m,
    id: m.id,
    name: m.name,
});