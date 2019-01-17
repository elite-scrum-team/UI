import {actions} from '../actions/UserAction';

const initialState = {
    id: null,
    email: null,
    isAdmin: false,
    group: [],
    roles: {
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
                    groups: action.payload.group ? action.payload.group.map(g => (
                        {name: g.name, id: g.id, municipalitiyId: g.municipalitiy }
                    )) : [],
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
