import gql from 'graphql-tag';

import ReactionGroupFragment from 'fragments/reaction-groups-fragments';

export const AddIssueComment = gql`
    mutation AddComment($commentText: String!, $issueId: ID!) {
        addComment(input: { body: $commentText, subjectId: $issueId }) {
            commentEdge {
                node {
                    id
                    author {
                        login
                        avatarUrl
                    }
                    bodyHTML
                    reactionGroups {
                        ...ReactionGroupFragment
                    }
                }
            }
        }
    }
    ${ReactionGroupFragment}
`;
