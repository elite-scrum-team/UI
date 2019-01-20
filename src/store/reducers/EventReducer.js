import {actions} from '../actions/EventAction';
import keyBy from 'lodash';
const initialState = {
    event : {},
    eventItems: {}
};

export default function reducer(state = initialState, action) {
    const data = action.payload;

    if(!isPayloadValid(data)) {
        return state;
    }
    switch (action.type) {

        case actions.SET_EVENT_POSTS: {
            return {...state, event: keyBy(action.payload, 'id')};
        }

        case actions.SET_EVENT_BY_ID: {
            return {...state, event: {
                    ...state.event,
                    [action.id]: action.payload,
                }}
        }

        case action.SET_EVENT_ITEMS: {
            return {
                ...state,
                eventItems: keyBy(action.payload, action.id),
            }
        }

        case action.SET_EVENT_ITEM: {
            return {
                ...state,
                eventItems: {
                    ...state.eventItems,
                    [action.id]: action.payload,
                }
            }
        }

        case action.ADD_EVENT_ITEM: {
            const items = Object.assign([], state.eventItems[action.id]);
            items.unshift(action.payload);
            return {
                ...state,
                eventItems: {
                    ...state.eventItems,
                    [action.id]: items,
                }
            }
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
