import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import {
    changeAccess,
    changeLogin,
    changePassword,
    loginSuccess,
    loginError,
} from 'actions/authentication-actions';

const AuthenticationRecord = Record({
    isHaveAccess: false,
    id: '',
    login: '',
    password: '',
    avatarUrl: '',
    token: '',
});

export default handleActions(
    {
        [changeLogin]: (state, action) => state.set('login', action.payload.login),
        [changePassword]: (state, action) => state.set('password', action.payload.password),
        [changeAccess]: (state, action) => state.set('isHaveAccess', action.payload.isHaveAccess),
        [loginSuccess]: (state, action) =>
            state
                .set('id', action.payload.id)
                .set('login', action.payload.login)
                .set('avatarUrl', action.payload.avatarUrl)
                .set('token', action.payload.token)
                .set('isHaveAccess', true),
        [loginError]: state => state.set('isHaveAccess', false),
    },
    new AuthenticationRecord(),
);
