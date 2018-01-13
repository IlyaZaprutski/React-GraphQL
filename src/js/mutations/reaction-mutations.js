import gql from 'graphql-tag';

export const AddReactionToIssue = gql`
    mutation addReaction($reactionType: ReactionContent!, $subjectId: ID!) {
        addReaction(input: { content: $reactionType, subjectId: $subjectId }) {
            reaction {
                content
            }
            subject {
                id
            }
        }
    }
`;

export const RemoveReactionFromIssue = gql`
    mutation removeReaction($reactionType: ReactionContent!, $subjectId: ID!) {
        removeReaction(input: { content: $reactionType, subjectId: $subjectId }) {
            reaction {
                content
            }
            subject {
                id
            }
        }
    }
`;
