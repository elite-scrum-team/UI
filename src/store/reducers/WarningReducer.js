import {actions} from '../actions/WarningAction';
import {keyBy} from 'lodash';

const initialState = {
    warning : {}
};

export default function reducer(state = initialState, action) {
    const data = action.payload;
    if(!isPayloadValid(data)) {
        return state;
    }
    switch (action.type) {

        case actions.SET_WARNING_POSTS: {
            return {...state, warning: keyBy(action.payload, 'id')};
        }

        case actions.SET_WARNING_BY_ID: {
            return {...state, warning: {
                    ...state.warning,
                    [action.id]: action.payload,
                }}
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
