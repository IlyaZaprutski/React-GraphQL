import { graphql } from 'react-apollo';

import RepositoriesList from 'components/repositories-list/repositories-list';
import { SearchRepositories } from 'queries/repository-queries';

const mapDataToProps = ({ data }) => {
    if (data.loading) {
        return { isLoading: true, repositories: [], repositoriesCount: 0 };
    }

    return {
        isLoading: data.loading,
        repositories: data.search.edges.map(edge => ({
            id: edge.node.id,
            name: edge.node.nameWithOwner,
            forksCount: edge.node.forkCount,
            watchersCount: edge.node.watchers.totalCount,
            starsCount: edge.node.stargazers.totalCount,
            url: edge.node.url,
        })),

        pageInfo: data.search.pageInfo,
        repositoriesCount: data.search.repositoryCount,
        onLoadRepositories: () =>
            data.fetchMore({
                query: SearchRepositories,
                variables: {
                    cursor: data.search.pageInfo.endCursor,
                    ...data.variables,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const {
                        repositoryCount,
                        pageInfo,
                        __typename,
                        edges: newEdges,
                    } = fetchMoreResult.search;

                    return newEdges.length
                        ? {
                            search: {
                                __typename,
                                edges: [...previousResult.search.edges, ...newEdges],
                                pageInfo,
                                repositoryCount,
                            },
                        }
                        : previousResult;
                },
            }),
    };
};

const mapPropsToOptions = ({ searchString }) => ({
    variables: {
        searchString,
    },
    skip: !searchString,
});

export default graphql(SearchRepositories, {
    props: mapDataToProps,
    options: mapPropsToOptions,
})(RepositoriesList);
