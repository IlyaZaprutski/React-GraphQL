import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ResultsPanel from 'main/components/results-panel/results-panel';

const SearchUsersQuery = gql`
    query SearchUsers($searchString: String!) {
        search(query: $searchString, type: USER, first: 100) {
            userCount
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                node {
                    ... on User {
                        login
                        avatarUrl
                        id
                    }
                }
            }
        }
    }
`;

export default graphql(SearchUsersQuery, {
    props: ({ data }) => {
        if (data.loading) {
            return { isLoading: true, users: [] };
        }

        return {
            isLoading: data.loading,
            users: data.search.edges.map(edge => ({
                id: edge.node.id,
                login: edge.node.login,
                avatarUrl: edge.node.avatarUrl,
            })),
        };
    },
    options: ({ searchString }) => ({
        variables: {
            searchString: `${searchString} type:user in:login`,
            skip: !searchString,
        },
    }),
})(ResultsPanel);
