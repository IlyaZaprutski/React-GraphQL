import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { changeSearchString } from 'actions/repositories-info-actions';

const RepositoriesInfoRecord = Record({
    searchString: 'React-GraphQL-Ilya',
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
    },
    new RepositoriesInfoRecord(),
);
