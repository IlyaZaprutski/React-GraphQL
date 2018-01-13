import gql from 'graphql-tag';

export default gql`
    fragment ReactionGroupFragment on ReactionGroup {
        subject {
            id
        }
        content
        viewerHasReacted
        users(first: 50) {
            totalCount
            edges {
                node {
                    ... on User {
                        id
                        avatarUrl
                        login
                    }
                }
            }
        }
    }
`;
