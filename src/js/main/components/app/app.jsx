import React from 'react';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';

import * as appReducers from 'main/reducers';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GitHubAPISchema from 'main/schema/github-api-schema.json';

import MainContainer from 'main/containers/main-containers';

import './app.scss';

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }));

    return forward(operation);
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: GitHubAPISchema,
});

const client = new ApolloClient({
    link: from([authMiddleware, new HttpLink({ uri: 'https://api.github.com/graphql' })]),
    cache: new InMemoryCache({ fragmentMatcher }),
});

const reducer = combineReducers(appReducers);
const store = createStore(reducer, applyMiddleware(thunk));

export default () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <MuiThemeProvider>
                <div className="page-container">
                    <MainContainer />
                </div>
            </MuiThemeProvider>
        </Provider>
    </ApolloProvider>
);
