import {actions} from '../actions/UserAction';

const initialState = {
    id: null,
    email: null,
    isAdmin: false,
    group: [],
    roles: {
        municipalities: [],
        groups: [],
    },
};

export default function reducer(state = initialState, action) {
 
    switch (action.type) {

        case actions.SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                roles: {
                    municipalities: action.payload.group ?
                        action.payload.group.filter(g => g.municipalitiy).map(g => g.municipalitiy) : [],
                    groups: action.payload.group ? action.payload.group.map(g => g.id) : [],
                }
            }
        }

        case actions.CLEAR_USER_DATA: {
            return {
                id: null,
                email: null,
                isAdmin: false,
                group: [],
                roles: {
                    municipalities: [],
                    groups: [],
                },
            }
        }

        default:
            return state;
    }
};
