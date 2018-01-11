import gql from 'graphql-tag';

export const SearchRepositories = gql`
    query SearchRepositories($searchString: String!, $cursor: String) {
        search(query: $searchString, type: REPOSITORY, first: 10, after: $cursor) {
            repositoryCount
            pageInfo {
                endCursor
                hasNextPage
                __typename
            }
            edges {
                node {
                    ... on Repository {
                        id
                        nameWithOwner
                        forkCount
                        watchers {
                            totalCount
                        }
                        stargazers {
                            totalCount
                        }
                        url
                    }
                }
            }
        }
    }
`;

export const GetIssuesForRepository = gql`
    query GetIssuesForRepository($repositoryId: ID!, $cursor: String) {
        node(id: $repositoryId) {
            ... on Repository {
                id
                name
                issues(first: 10, after: $cursor, orderBy: { field: CREATED_AT, direction: DESC }) {
                    totalCount
                    pageInfo {
                        endCursor
                        hasNextPage
                        __typename
                    }
                    edges {
                        node {
                            ... on Issue {
                                id
                                title
                                closed
                                url
                                comments {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
