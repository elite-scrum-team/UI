import reducer from '../../store/reducers/CategoryReducer';
import {keyBy} from 'lodash';
import { actions } from '../../store/actions/CategoryAction';


//MOCKDATA
import categories from './mock/category'

describe('Catagory reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                categories : {}
            }
        )
    });

    it('should SET_ALL_CATEGORIES', ()=>{
        expect(
            reducer([], {
                type: actions.SET_ALL_CATEGORIES,
                payload: categories,
            })
        ).toEqual(
            {
                categories: keyBy(categories, "id"),
            })
    });

    it('should SET_CATEGORY', ()=>{
        expect(
            reducer({categories: categories}, {
                type: actions.SET_WARNING_ITEMS,
                payload: categories[2],
                id: 1
            })
        ).toEqual({
            categories : categories
        })
    });


});
