import gql from 'graphql-tag';

export const AddIssueComment = gql`
    mutation AddComment($commentText: String!, $issueId: ID!) {
        addComment(input: { body: $commentText, subjectId: $issueId }) {
            commentEdge {
                node {
                    author {
                        login
                        avatarUrl
                    }
                    bodyHTML
                }
            }
        }
    }
`;
