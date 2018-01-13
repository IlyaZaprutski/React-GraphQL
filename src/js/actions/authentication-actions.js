import { createAction } from 'redux-actions';
import gql from 'graphql-tag';

import ActionTypes from 'constants/action-types-constants';

import * as LoginController from 'controllers/login-controller';

import ApolloClient from 'apollo/apollo-client';

export const changeAccess = createAction(ActionTypes.CHANGE_ACCESS, isHaveAccess => ({
    isHaveAccess,
}));

export const changeLogin = createAction(ActionTypes.CHANGE_LOGIN, login => ({
    login,
}));

export const changePassword = createAction(ActionTypes.CHANGE_PASSWORD, password => ({
    password,
}));

export const loginSuccess = createAction(
    ActionTypes.LOGIN_SUCCESS,
    (id, login, avatarUrl, token) => ({
        id,
        login,
        avatarUrl,
        token,
    }),
);

export const loginError = createAction(ActionTypes.LOGIN_ERROR);

export const login = () => (dispatch, getState) => {
    const { authInfo } = getState();
    const userLogin = `"${authInfo.get('login')}"`;

    LoginController.login(authInfo.get('login'), authInfo.get('password')).then(
        (token) => {
            localStorage.setItem('token', token);

            ApolloClient.query({
                query: gql`
                    {
                        user(login: ${userLogin}) {
                            id
                            login
                            avatarUrl
                            createdAt
                        }
                    }
                `,
            }).then(({ data }) => {
                dispatch(loginSuccess(data.user.id, data.user.login, data.user.avatarUrl, token));
            });
        },
        (error) => {
            alert(`Unauthorized Error for ${authInfo.get('login')}`);
            dispatch(loginError(error));
        },
    );
};
