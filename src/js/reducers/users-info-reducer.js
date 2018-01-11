import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { changeSearchString, changeSelectedUser } from 'actions/users-info-actions';

const UsersInfoRecord = Record({
    searchString: '',
    selectedUserId: '',
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
        [changeSelectedUser]: (state, action) => state.set('selectedUserId', action.payload.userId),
    },
    new UsersInfoRecord(),
);
