import {actions} from '../actions/UserAction';

const initialState = {
    id: null,
    email: null,
    isAdmin: false,
    group: [],
    roles: {
        groups: [],
    },

    selectedGroup: null, // The current selected group
};

export default function reducer(state = initialState, action) {
 
    switch (action.type) {

        case actions.SET_USER_DATA: {

            const groups = action.payload.group ? action.payload.group.map(g => (
                {name: g.name, id: g.id, municipalitiyId: g.municipalitiy }
            )) : [];

            // Set default selected group
            let selectedGroup = null;
            if(state.selectedGroup === null && groups.length > 0) {
                selectedGroup = groups.find(e => e.municipalitiyId !== null) || groups[0];
            }

            return {
                ...state,
                ...action.payload,
                roles: {
                    groups: groups
                },
                selectedGroup: selectedGroup,
            }
        }

        case actions.SET_CURRENT_GROUP: {
            return {...state, selectedGroup: action.payload};
        }

        case actions.CLEAR_USER_DATA: {
            console.log('CLEARING USER DATA');
            return {
                id: null,
                email: null,
                isAdmin: false,
                group: [],
                roles: {
                    municipalities: [],
                    groups: [],
                },
                selectedGroup: null,
            }
        }

        default:
            return state;
    }
};
