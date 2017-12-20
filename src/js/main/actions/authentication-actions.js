import { createAction } from 'redux-actions';

import ActionTypes from 'main/constants/action-types';

import * as LoginController from 'main/controllers/login-controller';

export const changeAccess = createAction(ActionTypes.CHANGE_ACCESS, isHaveAccess => ({
    isHaveAccess,
}));

export const changeLogin = createAction(ActionTypes.CHANGE_LOGIN, login => ({
    login,
}));

export const changePassword = createAction(ActionTypes.CHANGE_PASSWORD, password => ({
    password,
}));

export const loginSuccess = createAction(ActionTypes.LOGIN_SUCCESS, token => ({
    token,
}));

export const loginError = createAction(ActionTypes.LOGIN_ERROR);

export const login = () => (dispatch, getState) => {
    const { authInfo } = getState();

    LoginController.login(authInfo.get('login'), authInfo.get('password')).then(
        (token) => {
            localStorage.setItem('token', token);
            dispatch(loginSuccess(token));
        },
        (error) => {
            alert(`Unauthorized Error for ${authInfo.get('login')}`);
            dispatch(loginError(error));
        },
    );
};
