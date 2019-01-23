import {actions} from '../actions/WarningAction';
import {keyBy} from 'lodash';

const initialState = {
    warning : {},
    warningItems: {}
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

        case actions.SET_WARNING_ITEMS: {
            return {
                ...state,
                warningItems: keyBy(action.payload, action.id),
            }
        }

        case actions.SET_WARNING_ITEM: {
            return {
                ...state,
                warningItems: {
                    ...state.warningItems,
                    [action.id]: action.payload,
                }
            }
        }

        case actions.ADD_WARNING_ITEM: {
            const items = Object.assign([], state.warningItems[action.id]);
            items.unshift(action.payload);
            return {
                ...state,
                warningItems: {
                    ...state.warningItems,
                    [action.id]: items,
                }
            }
        }

        case actions.UPDATE_WARNING: {
            const warnings = Object.assign([], state.warning);
            const warning = warnings[action.id];

            if(!warning) {
                return;
            }

            // Update warning
            const payload = action.payload || {};
            if(payload.categoryId) {
                warning.categoryId = payload.categoryId;
            }
            else if(payload.category) {
                warning.category = payload.category;
            }

            return {
                ...state,
                warning: {
                    ...warnings,
                    [warning.id]: warning,
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
