import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { changeSearchString } from 'actions/repositories-info-actions';

const RepositoriesInfoRecord = Record({
    searchString: '',
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
    },
    new RepositoriesInfoRecord(),
);
