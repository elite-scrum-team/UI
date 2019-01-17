import { combineReducers } from 'redux';

// Project Reducers

import warning from './WarningReducer';
import category from './CategoryReducer';
import user from './UserReducer';

export default combineReducers({
    warning,
    category,
    user
});

