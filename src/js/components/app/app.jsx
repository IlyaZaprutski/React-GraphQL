import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from 'store';

import apolloClient from 'apollo/apollo-client';

import MainContainer from 'containers/main-containers';

import './app.scss';

export default () => (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <MuiThemeProvider>
                <div className="page-container">
                    <MainContainer />
                </div>
            </MuiThemeProvider>
        </Provider>
    </ApolloProvider>
);
