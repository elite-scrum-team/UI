import { combineReducers } from 'redux';

// Project Reducers

import warning from './WarningReducer';
import category from './CategoryReducer';

export default combineReducers({
    warning,
    category,
});

