import {actions} from '../actions/LocationAction';

const initialState = {
    municipalities: [],
};

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case actions.SET_MUNICIPALITIES: {
            return {...state, municipalities: action.payload.filter(e => e.name)};
        }

        default:
            return state;
    }
};
