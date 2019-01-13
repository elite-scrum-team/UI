import {actions} from '../actions/CategoryAction';
import {keyBy} from 'lodash';

const initialState = {
    categories : {}
};

export default function reducer(state = initialState, action) {
    const data = action.payload;
    if(!isPayloadValid(data)) {
        return state;
    }

    switch (action.type) {

        case actions.SET_ALL_CATEGORIES: {
            return {...state, categories: keyBy(action.payload, 'id')};
        }

        case actions.SET_CATEGORY: {
            return {...state, warncategoriesing: {
                    ...state.categories,
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
