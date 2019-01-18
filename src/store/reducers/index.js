import { combineReducers } from 'redux';

// Project Reducers

import warning from './WarningReducer';
import category from './CategoryReducer';
import user from './UserReducer';
import location from './LocationReducer';

export default combineReducers({
    warning,
    category,
    user,
    location
});

