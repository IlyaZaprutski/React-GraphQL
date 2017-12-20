import gql from 'graphql-tag';

export const SearchUsersQuery = gql`
    query SearchUsers($searchString: String!, $cursor: String) {
        search(query: $searchString, type: USER, first: 10, after: $cursor) {
            userCount
            pageInfo {
                endCursor
                hasNextPage
                __typename
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

export const GetUserDetailInfoQuery = gql`
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
