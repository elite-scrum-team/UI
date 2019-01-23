import reducer from '../../store/reducers/WarningReducer';
import {keyBy} from 'lodash';
import { actions } from '../../store/actions/WarningAction';


//MOCKDATA
import warnings from './mock/warning';
import warningItems from './mock/warningItems';

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

    it('running SET_WARNING_ITEM', ()=>{
        expect(
            reducer({warningItems: {}}, {
                type: actions.SET_WARNING_ITEM,
                payload: warningItems,
                id: 1
            })
        ).toEqual({
            warningItems: {
                1: warningItems,
            }
        })
    });

    it('running ADD_WARNING_ITEM', ()=>{
        expect(
            reducer({warningItems: {}}, {
                type: actions.ADD_WARNING_ITEM,
                payload: warningItems[0],
                id: 2,
            })
        ).toEqual({
            warningItems : {
                2: [warningItems[0]]
            }
        })
    });

});
