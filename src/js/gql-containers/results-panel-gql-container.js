import { graphql } from 'react-apollo';

import ResultsPanel from 'components/results-panel/results-panel';
import { SearchUsersQuery } from 'queries/user-queries';

export default graphql(SearchUsersQuery, {
    props: ({ data }) => {
        if (data.loading) {
            return { isLoading: true, users: [], usersCount: 0 };
        }

        return {
            isLoading: data.loading,
            users: data.search.edges.map(edge => ({
                id: edge.node.id,
                login: edge.node.login,
                avatarUrl: edge.node.avatarUrl,
            })),
            pageInfo: data.search.pageInfo,
            usersCount: data.search.userCount,
            onLoadUsers: () =>
                data.fetchMore({
                    query: SearchUsersQuery,
                    variables: {
                        cursor: data.search.pageInfo.endCursor,
                        ...data.variables,
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        const newEdges = fetchMoreResult.search.edges;
                        const { pageInfo } = fetchMoreResult.search;

                        return newEdges.length
                            ? {
                                search: {
                                    __typename: previousResult.search.__typename,
                                    edges: [...previousResult.search.edges, ...newEdges],
                                    pageInfo,
                                    userCount: fetchMoreResult.search.userCount,
                                },
                            }
                            : previousResult;
                    },
                }),
        };
    },

    options: ({ searchString }) => ({
        variables: {
            searchString: `${searchString} type:user in:login`,
        },
        skip: !searchString,
    }),
})(ResultsPanel);
