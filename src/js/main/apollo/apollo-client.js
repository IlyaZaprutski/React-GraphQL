import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';

import GitHubAPISchema from 'main/schema/github-api-schema.json';

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

export default new ApolloClient({
    link: from([authMiddleware, new HttpLink({ uri: 'https://api.github.com/graphql' })]),
    cache: new InMemoryCache({ fragmentMatcher }),
});
