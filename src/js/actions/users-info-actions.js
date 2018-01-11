import { createAction } from 'redux-actions';

import ActionTypes from 'constants/action-types';

export const changeSearchString = createAction(
    ActionTypes.CHANGE_USERS_SEARCH_STRING,
    searchString => ({
        searchString,
    }),
);

export const changeSelectedUser = createAction(ActionTypes.CHANGE_SELECTED_USER, userId => ({
    userId,
}));
