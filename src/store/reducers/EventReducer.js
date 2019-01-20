import {actions} from '../actions/EventAction';
import keyBy from 'lodash';
const initialState = {
    events: {}
};

export default function reducer(state = initialState, action) {
    
    switch (action.type) {

        case actions.SET_EVENT_ITEMS: {
            return {
                ...state,
                events: keyBy(action.payload, action.id),
            }
        }

        case actions.SET_EVENT_BY_ID: {
            return {
                ...state,
                events: {
                    ...state.eventItems,
                    [action.id]: action.payload,
                }
            }
        }

        default:
            return state;
    }
};
