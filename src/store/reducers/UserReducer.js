import {actions} from '../actions/UserAction';

const initialState = {
    email: null,
    municipality: null,
};

export default function reducer(state = initialState, action) {
    const data = action.payload;
    if(!isPayloadValid(data)) {
        return state;
    }

    switch (action.type) {

        case actions.SET_USER_DATA: {
            return {
                ...state,
                email: action.payload.email ? action.payload.email : null,
                municipality: action.payload.municipality ? action.payload.municipality : null,
            };
        }

        default:
            return state;
    }
};

// Helper functions

// Checks if action.payload data is not null or undefined
const isPayloadValid = (payload) => {
    return (typeof(payload) !== undefined);
};
