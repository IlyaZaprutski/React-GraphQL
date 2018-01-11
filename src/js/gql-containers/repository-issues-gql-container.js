import { graphql } from 'react-apollo';

import RepositoryIssues from 'components/repository-issues/repository-issues';
import { GetIssuesForRepository } from 'queries/repository-queries';

const mapDataToProps = ({ data }) => {
    if (data.loading) {
        return {
            isLoading: true,
            issues: [],
            issuesCount: 0,
            repositoryId: data.variables.repositoryId,
        };
    }

    return {
        isLoading: data.loading,
        repositoryId: data.node.id,
        repositoryName: data.node.name,

        issues: data.node.issues.edges.map(({ node }) => ({
            id: node.id,
            title: node.title,
            isClosed: node.closed,
            url: node.url,
            commentsCount: node.comments.totalCount,
        })),

        pageInfo: data.node.issues.pageInfo,
        issuesCount: data.node.issues.totalCount,
        onLoadIssues: () =>
            data.fetchMore({
                query: GetIssuesForRepository,
                variables: {
                    cursor: data.node.issues.pageInfo.endCursor,
                    ...data.variables,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    const { id, name, issues } = fetchMoreResult.node;
                    const {
                        pageInfo, totalCount, __typename, edges: newEdges,
                    } = issues;

                    return newEdges.length
                        ? {
                            node: {
                                id,
                                name,
                                issues: {
                                    edges: [...previousResult.node.issues.edges, ...newEdges],
                                    pageInfo,
                                    totalCount,
                                    __typename,
                                },
                                __typename: fetchMoreResult.node.__typename,
                            },
                        }
                        : previousResult;
                },
            }),
    };
};

const mapPropsToOptions = ({ match: { params } }) => ({
    variables: {
        repositoryId: params.repositoryId,
    },
});

export default graphql(GetIssuesForRepository, {
    props: mapDataToProps,
    options: mapPropsToOptions,
})(RepositoryIssues);
