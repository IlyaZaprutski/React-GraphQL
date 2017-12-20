import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { changeSearchString, changeSelectedUser } from 'main/actions/main-actions';

const MainRecord = Record({
    token: '',
    searchString: '',
    selectedUserId: '',
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
        [changeSelectedUser]: (state, action) => state.set('selectedUserId', action.payload.userId),
    },
    new MainRecord(),
);
