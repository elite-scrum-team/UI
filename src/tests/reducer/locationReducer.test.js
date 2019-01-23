import reducer, {initialState} from '../../store/reducers/LocationReducer';
import {keyBy} from 'lodash';
import { actions } from '../../store/actions/LocationAction';


// MOCKDATA
import municipalities from './mock/municipalities';


describe('Location reducer', () => {
        
    it('Testing SET_MUNICIPALITIES', () => {
        expect(reducer(initialState, {
            type: actions.SET_MUNICIPALITIES,
            payload: municipalities,
        }))
        .toEqual({
            municipalities: municipalities
        })
    });
});
