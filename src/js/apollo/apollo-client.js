import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }));

    return forward(operation);
});

export default new ApolloClient({
    link: from([authMiddleware, new HttpLink({ uri: 'https://api.github.com/graphql' })]),
    cache: new InMemoryCache({
        dataIdFromObject: (object) => {
            switch (object.__typename) {
            case 'ReactionGroup':
                return `${object.__typename}__${object.subject.id}__${object.content}`;
            default:
                return defaultDataIdFromObject(object);
            }
        },
    }),
    connectToDevTools: true,
});
