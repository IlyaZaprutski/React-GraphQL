import { graphql } from 'react-apollo';

import UserDetailInfo from 'main/components/user-detail-info/user-detail-info';

import { GetUserDetailInfoQuery } from 'main/queries/user-queries';

export default graphql(GetUserDetailInfoQuery, {
    props: ({ data }) => {
        if (data.loading) {
            return { isLoading: true, userId: data.variables.userId };
        }

        return {
            isLoading: data.loading,
            avatarUrl: data.node.avatarUrl,
            userName: data.node.name,
            repositories: data.node.repositories.edges.map(edge => ({
                id: edge.node.id,
                name: edge.node.name,
                description: edge.node.description,
                countIssues: edge.node.issues.totalCount,
            })),
        };
    },
    options: ({ userId }) => ({
        variables: {
            userId,
            skip: !userId,
        },
    }),
})(UserDetailInfo);
