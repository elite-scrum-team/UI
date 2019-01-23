import reducer, {initialState} from '../../store/reducers/UserReducer';
import {keyBy} from 'lodash';
import { actions } from '../../store/actions/UserAction';


// MOCKDATA
import userMocks, {userStateMock} from './mock/users';
const userState = userStateMock(userMocks[0]);


describe('User reducer', () => {

    it('Testing SET_USER_DATA', () => {
        expect(reducer(initialState, {
            type: actions.SET_USER_DATA,
            payload: userMocks[0],
        }))
        .toEqual(userState)
    });

    it('Testing SET_CURRENT_GROUP', () => {
        const selectedGroup = {name: 'TestGroup', id: 'MyTestId'}

        expect(reducer(initialState, {
            type: actions.SET_CURRENT_GROUP,
            payload: selectedGroup
        }))
        .toEqual({
            ...initialState,
            selectedGroup
        })
    });

    it('Testing CLEAR_USER_DATA', () => {
        const selectedGroup = {name: 'HEY! :D', id: 'ASDF'};

        expect(reducer(userState, {
            type: actions.CLEAR_USER_DATA,
        }))
        .toEqual(initialState);
    });


});
