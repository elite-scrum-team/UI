import reducer from '../../store/reducers/WarningReducer';
import {keyBy} from 'lodash';
import { actions } from '../../store/actions/WarningAction';


//MOCKDATA
import warnings from './mock/warning'

describe('Article reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                warning : {},
                warningItems: {}
            }
        )
    });

    it('should set a WarningById', ()=>{
        expect(
            reducer([], {
                type: actions.SET_WARNING_BY_ID,
                payload: warnings[0],
                id: warnings[0].id
            })
        ).toEqual(
            {
                warning: {1: warnings[0]},
            })
    });

    it('running  SET_WARNING_ITEMS', ()=>{
        expect(
            reducer({warningItems: warnings}, {
                type: actions.SET_WARNING_ITEMS,
                payload: warnings,
            })
        ).toEqual({
            warningItems : warnings
        })
    });

    it('running SET_WARNING_ITEM', ()=>{
        expect(
            reducer({warningItems: warnings}, {
                type: actions.SET_WARNING_ITEM,
                payload: warnings[2],
                id: 1
            })
        ).toEqual({
            warningItems : warnings
        })
    });


    it('running ADD_WARNING_ITEM', ()=>{
        expect(
            reducer({warningItems: warnings}, {
                type: actions.ADD_WARNING_ITEM,
                payload: warnings[2],
                id: 1
            })
        ).toEqual({
            warningItems : warnings
        })
    });

});
