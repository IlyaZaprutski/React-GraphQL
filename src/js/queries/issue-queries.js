import gql from 'graphql-tag';

export const GetIssueInfo = gql`
    query GetIssueInfo($issueId: ID!) {
        node(id: $issueId) {
            ... on Issue {
                id
                title
                bodyHTML
                closed
                author {
                    login
                    avatarUrl
                }
                reactions(first: 50) {
                    edges {
                        node {
                            user {
                                avatarUrl
                                login
                            }
                            content
                        }
                    }
                }
                comments(first: 50) {
                    edges {
                        node {
                            id
                            author {
                                login
                                avatarUrl
                            }
                            bodyHTML
                            reactions(first: 50) {
                                edges {
                                    node {
                                        user {
                                            avatarUrl
                                            login
                                        }
                                        content
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
