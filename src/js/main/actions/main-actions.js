import { createAction } from 'redux-actions';

import ActionTypes from 'main/constants/action-types';

export const changeSearchString = createAction(ActionTypes.CHANGE_SEARCH_STRING, searchString => ({
    searchString,
}));

export const changeSelectedUser = createAction(ActionTypes.CHANGE_SELECTED_USER, userId => ({
    userId,
}));
