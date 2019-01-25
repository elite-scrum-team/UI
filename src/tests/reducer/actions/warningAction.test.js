import * as WarningAction from '../../../store/actions/WarningAction';

import warningMocks from '../mock/warning';

describe('WarningAction tests', () => {
    
    it(`Testing ${WarningAction.actions.SET_WARNING_POSTS}`, (done) => {
        const data = warningMocks;

        const dispatch = jest.fn(({type, payload}) => {
            expect(type).toEqual(WarningAction.actions.SET_WARNING_POSTS);
            expect(payload).toEqual(data);
            done();
        });

        WarningAction.setWarningPost(data)(dispatch);
        expect(dispatch).toBeCalled();
    });
});
