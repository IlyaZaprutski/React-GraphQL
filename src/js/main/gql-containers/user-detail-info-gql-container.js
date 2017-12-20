import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import UserDetailInfo from 'main/components/user-detail-info/user-detail-info';

const GetUserDetailInfoQuery = gql`
    query GetUserDetailInfo($userId: ID!) {
        node(id: $userId) {
            ... on User {
                login
                avatarUrl
                id
                name
                repositories(first: 100) {
                    edges {
                        node {
                            id
                            name
                            description
                            issues {
                                totalCount
                            }
                        }
                    }
                }
            }
        }
    }
`;

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
